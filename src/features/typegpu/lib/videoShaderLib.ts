import tgpu, { d, std } from "typegpu";

export function createVideoShaderFns() {
  const roundedBoxSd = tgpu.fn(
    [d.vec2f, d.vec2f, d.f32],
    d.f32,
  )((p, ext, corner) => {
    "use gpu";
    const abs = d.vec2f(std.abs(p.x), std.abs(p.y));
    const q = abs.sub(ext).add(d.vec2f(corner, corner));
    return (
      std.length(std.max(q, d.vec2f(0.0, 0.0))) +
      std.min(std.max(q.x, q.y), 0.0) -
      corner
    );
  });

  const toCoverUv = tgpu.fn(
    [d.vec2f, d.vec2f, d.vec2f],
    d.vec2f,
  )((uv, coverHalf, coverScale) => {
    "use gpu";
    return uv.sub(coverHalf).div(coverScale).add(coverHalf);
  });

  const rippleDisplacement = tgpu.fn(
    [d.vec2f, d.f32, d.f32, d.f32, d.f32, d.f32, d.f32, d.f32],
    d.vec2f,
  )((sampleUv, aspect, time, gain, originX, originY, birthTime, velocityX) => {
    "use gpu";
    const waveSpeed = 0.3;
    const waveK = 108.0;
    const maxAge = 2.6;
    const age = time - birthTime;
    const live =
      std.smoothstep(maxAge, maxAge * 0.58, age) *
      std.smoothstep(-0.03, 0.04, age);
    const originScreenY = 1.0 - originY;
    const relX = (sampleUv.x - originX) * aspect;
    const relY = sampleUv.y - originScreenY;
    const radius = std.length(d.vec2f(relX, relY));
    const move = std.sign(velocityX + 0.0001);
    const ahead = relX * move;
    const dirMask = std.smoothstep(0.06, -0.03, ahead);
    const front = waveSpeed * age;
    const ringWidth = 0.05 + age * 0.014;
    const ringEnv = std.smoothstep(ringWidth, 0.0, std.abs(radius - front));
    const tailEnv = std.smoothstep(front + 0.07, front * 0.52, radius);
    const phase =
      radius * waveK - age * waveK * waveSpeed * 0.82 + originX * 21.3;
    const wave = std.sin(phase) + std.sin(phase * 1.7 + age * 2.8) * 0.32;
    const spread = 1.0 / (1.0 + radius * 1.0 + age * 0.55);
    const strength = 0.5 + std.abs(velocityX) * 0.85;
    const envelope =
      live * spread * (ringEnv * 0.85 + tailEnv * 0.15) * dirMask * strength;
    const safeRadius = std.max(radius, 0.0015);
    const amplitude = envelope * 0.012 * gain;
    return d.vec2f(
      (relX / safeRadius) * wave * amplitude,
      (relY / safeRadius) * wave * amplitude,
    );
  });

  const gradedVideo = tgpu.fn(
    [d.vec4f, d.vec2f, d.f32],
    d.vec4f,
  )((source, uv, time) => {
    "use gpu";
    const contrast = 1.18;
    const centered = source.rgb
      .sub(d.vec3f(0.5, 0.5, 0.5))
      .mul(contrast)
      .add(d.vec3f(0.5, 0.5, 0.5));
    const warm = d.vec3f(
      centered.x * 1.08,
      centered.y * 0.98,
      centered.z * 0.92,
    );
    const vignette = 1.0 - std.length(uv.sub(d.vec2f(0.5, 0.5))) * 0.85;
    const scan = std.sin(uv.y * 420.0 + time * 6.0) * 0.025;
    return d
      .vec4f(
        std.clamp(warm.x + scan, 0.0, 1.0),
        std.clamp(warm.y + scan, 0.0, 1.0),
        std.clamp(warm.z + scan, 0.0, 1.0),
        source.a,
      )
      .mul(vignette);
  });

  const applyEffectStack = tgpu.fn(
    [d.vec4f, d.vec4f, d.f32, d.f32, d.f32, d.f32, d.f32],
    d.vec4f,
  )((source, graded, fxVignette, fxInvert, fxNoir, fxNeon, time) => {
    "use gpu";
    const pulse = std.sin(time * 3.5) * 0.07;
    const afterVignette = std.mix(source, graded, fxVignette);
    const inverted = d.vec4f(
      d.vec3f(1.0, 1.0, 1.0).sub(afterVignette.rgb),
      afterVignette.a,
    );
    const afterInvert = std.mix(afterVignette, inverted, fxInvert);
    const luma =
      afterInvert.r * 0.2126 + afterInvert.g * 0.7152 + afterInvert.b * 0.0722;
    const bw = std.smoothstep(0.3, 0.72, luma);
    const noir = d.vec4f(bw, bw, bw, afterInvert.a);
    const afterNoir = std.mix(afterInvert, noir, fxNoir);
    const neon = d.vec4f(
      std.clamp(afterNoir.r * 1.38 + pulse, 0.0, 1.0),
      std.clamp(afterNoir.g * 0.72 + 0.06, 0.0, 1.0),
      std.clamp(afterNoir.b * 1.52 - pulse, 0.0, 1.0),
      afterNoir.a,
    );
    return std.mix(afterNoir, neon, fxNeon);
  });

  return {
    roundedBoxSd,
    toCoverUv,
    rippleDisplacement,
    gradedVideo,
    applyEffectStack,
  };
}
