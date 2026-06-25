import type { TgpuRoot } from "typegpu";
import { common, d, std } from "typegpu";

import { videoEffectLayout } from "~features/typegpu/lib/videoEffectParams";

export {
  videoEffectLayout,
  videoParamsSchema,
} from "~features/typegpu/lib/videoEffectParams";

// Full-screen video + stacked effect toggles + glass UI drawn in one fragment pass.
export function createVideoEffectPipeline(root: TgpuRoot) {
  return root.createRenderPipeline({
    vertex: common.fullScreenTriangle,
    fragment: ({ uv }) => {
      "use gpu";
      const params = videoEffectLayout.$.params;
      const sampleUv = d.vec2f(uv);
      const screenY = 1.0 - uv.y;
      const aspect = params.canvasAspect;
      const videoAspect = params.videoAspect;
      const coverHalf = d.vec2f(0.5, 0.5);
      const coverScale = d.vec2f(
        std.max(1.0, videoAspect / aspect),
        std.max(1.0, aspect / videoAspect),
      );
      const mask = params.effectMask;
      const fxVignette = std.mod(std.floor(mask), 2.0);
      const fxInvert = std.mod(std.floor(mask / 2.0), 2.0);
      const fxNoir = std.mod(std.floor(mask / 4.0), 2.0);
      const fxNeon = std.mod(std.floor(mask / 8.0), 2.0);

      // --- scrub ripples (10 fixed slots) ---
      const waveSpeed = 0.3;
      const waveK = 108.0;
      const maxAge = 2.6;
      const rippleGain = params.wakeEnergy;

      const age0 = params.time - params.ripple0t;
      const live0 =
        std.smoothstep(maxAge, maxAge * 0.58, age0) *
        std.smoothstep(-0.03, 0.04, age0);
      const oy0 = 1.0 - params.ripple0y;
      const relX0 = (sampleUv.x - params.ripple0x) * aspect;
      const relY0 = sampleUv.y - oy0;
      const r0 = std.length(d.vec2f(relX0, relY0));
      const vel0 = params.ripple0vx;
      const move0 = std.sign(vel0 + 0.0001);
      const ahead0 = relX0 * move0;
      const dirMask0 = std.smoothstep(0.06, -0.03, ahead0);
      const front0 = waveSpeed * age0;
      const ringW0 = 0.05 + age0 * 0.014;
      const ringEnv0 = std.smoothstep(ringW0, 0.0, std.abs(r0 - front0));
      const tailEnv0 = std.smoothstep(front0 + 0.07, front0 * 0.52, r0);
      const phase0 =
        r0 * waveK - age0 * waveK * waveSpeed * 0.82 + params.ripple0x * 21.3;
      const wave0 = std.sin(phase0) + std.sin(phase0 * 1.7 + age0 * 2.8) * 0.32;
      const spread0 = 1.0 / (1.0 + r0 * 1.0 + age0 * 0.55);
      const str0 = 0.5 + std.abs(vel0) * 0.85;
      const env0 =
        live0 * spread0 * (ringEnv0 * 0.85 + tailEnv0 * 0.15) * dirMask0 * str0;
      const safeR0 = std.max(r0, 0.0015);
      const amp0 = env0 * 0.012 * rippleGain;
      const disp0 = d.vec2f(
        (relX0 / safeR0) * wave0 * amp0,
        (relY0 / safeR0) * wave0 * amp0,
      );

      const age1 = params.time - params.ripple1t;
      const live1 =
        std.smoothstep(maxAge, maxAge * 0.58, age1) *
        std.smoothstep(-0.03, 0.04, age1);
      const oy1 = 1.0 - params.ripple1y;
      const relX1 = (sampleUv.x - params.ripple1x) * aspect;
      const relY1 = sampleUv.y - oy1;
      const r1 = std.length(d.vec2f(relX1, relY1));
      const vel1 = params.ripple1vx;
      const move1 = std.sign(vel1 + 0.0001);
      const ahead1 = relX1 * move1;
      const dirMask1 = std.smoothstep(0.06, -0.03, ahead1);
      const front1 = waveSpeed * age1;
      const ringW1 = 0.05 + age1 * 0.014;
      const ringEnv1 = std.smoothstep(ringW1, 0.0, std.abs(r1 - front1));
      const tailEnv1 = std.smoothstep(front1 + 0.07, front1 * 0.52, r1);
      const phase1 =
        r1 * waveK - age1 * waveK * waveSpeed * 0.82 + params.ripple1x * 21.3;
      const wave1 = std.sin(phase1) + std.sin(phase1 * 1.7 + age1 * 2.8) * 0.32;
      const spread1 = 1.0 / (1.0 + r1 * 1.0 + age1 * 0.55);
      const str1 = 0.5 + std.abs(vel1) * 0.85;
      const env1 =
        live1 * spread1 * (ringEnv1 * 0.85 + tailEnv1 * 0.15) * dirMask1 * str1;
      const safeR1 = std.max(r1, 0.0015);
      const amp1 = env1 * 0.012 * rippleGain;
      const disp1 = d.vec2f(
        (relX1 / safeR1) * wave1 * amp1,
        (relY1 / safeR1) * wave1 * amp1,
      );

      const age2 = params.time - params.ripple2t;
      const live2 =
        std.smoothstep(maxAge, maxAge * 0.58, age2) *
        std.smoothstep(-0.03, 0.04, age2);
      const oy2 = 1.0 - params.ripple2y;
      const relX2 = (sampleUv.x - params.ripple2x) * aspect;
      const relY2 = sampleUv.y - oy2;
      const r2 = std.length(d.vec2f(relX2, relY2));
      const vel2 = params.ripple2vx;
      const move2 = std.sign(vel2 + 0.0001);
      const ahead2 = relX2 * move2;
      const dirMask2 = std.smoothstep(0.06, -0.03, ahead2);
      const front2 = waveSpeed * age2;
      const ringW2 = 0.05 + age2 * 0.014;
      const ringEnv2 = std.smoothstep(ringW2, 0.0, std.abs(r2 - front2));
      const tailEnv2 = std.smoothstep(front2 + 0.07, front2 * 0.52, r2);
      const phase2 =
        r2 * waveK - age2 * waveK * waveSpeed * 0.82 + params.ripple2x * 21.3;
      const wave2 = std.sin(phase2) + std.sin(phase2 * 1.7 + age2 * 2.8) * 0.32;
      const spread2 = 1.0 / (1.0 + r2 * 1.0 + age2 * 0.55);
      const str2 = 0.5 + std.abs(vel2) * 0.85;
      const env2 =
        live2 * spread2 * (ringEnv2 * 0.85 + tailEnv2 * 0.15) * dirMask2 * str2;
      const safeR2 = std.max(r2, 0.0015);
      const amp2 = env2 * 0.012 * rippleGain;
      const disp2 = d.vec2f(
        (relX2 / safeR2) * wave2 * amp2,
        (relY2 / safeR2) * wave2 * amp2,
      );

      const age3 = params.time - params.ripple3t;
      const live3 =
        std.smoothstep(maxAge, maxAge * 0.58, age3) *
        std.smoothstep(-0.03, 0.04, age3);
      const oy3 = 1.0 - params.ripple3y;
      const relX3 = (sampleUv.x - params.ripple3x) * aspect;
      const relY3 = sampleUv.y - oy3;
      const r3 = std.length(d.vec2f(relX3, relY3));
      const vel3 = params.ripple3vx;
      const move3 = std.sign(vel3 + 0.0001);
      const ahead3 = relX3 * move3;
      const dirMask3 = std.smoothstep(0.06, -0.03, ahead3);
      const front3 = waveSpeed * age3;
      const ringW3 = 0.05 + age3 * 0.014;
      const ringEnv3 = std.smoothstep(ringW3, 0.0, std.abs(r3 - front3));
      const tailEnv3 = std.smoothstep(front3 + 0.07, front3 * 0.52, r3);
      const phase3 =
        r3 * waveK - age3 * waveK * waveSpeed * 0.82 + params.ripple3x * 21.3;
      const wave3 = std.sin(phase3) + std.sin(phase3 * 1.7 + age3 * 2.8) * 0.32;
      const spread3 = 1.0 / (1.0 + r3 * 1.0 + age3 * 0.55);
      const str3 = 0.5 + std.abs(vel3) * 0.85;
      const env3 =
        live3 * spread3 * (ringEnv3 * 0.85 + tailEnv3 * 0.15) * dirMask3 * str3;
      const safeR3 = std.max(r3, 0.0015);
      const amp3 = env3 * 0.012 * rippleGain;
      const disp3 = d.vec2f(
        (relX3 / safeR3) * wave3 * amp3,
        (relY3 / safeR3) * wave3 * amp3,
      );

      const age4 = params.time - params.ripple4t;
      const live4 =
        std.smoothstep(maxAge, maxAge * 0.58, age4) *
        std.smoothstep(-0.03, 0.04, age4);
      const oy4 = 1.0 - params.ripple4y;
      const relX4 = (sampleUv.x - params.ripple4x) * aspect;
      const relY4 = sampleUv.y - oy4;
      const r4 = std.length(d.vec2f(relX4, relY4));
      const vel4 = params.ripple4vx;
      const move4 = std.sign(vel4 + 0.0001);
      const ahead4 = relX4 * move4;
      const dirMask4 = std.smoothstep(0.06, -0.03, ahead4);
      const front4 = waveSpeed * age4;
      const ringW4 = 0.05 + age4 * 0.014;
      const ringEnv4 = std.smoothstep(ringW4, 0.0, std.abs(r4 - front4));
      const tailEnv4 = std.smoothstep(front4 + 0.07, front4 * 0.52, r4);
      const phase4 =
        r4 * waveK - age4 * waveK * waveSpeed * 0.82 + params.ripple4x * 21.3;
      const wave4 = std.sin(phase4) + std.sin(phase4 * 1.7 + age4 * 2.8) * 0.32;
      const spread4 = 1.0 / (1.0 + r4 * 1.0 + age4 * 0.55);
      const str4 = 0.5 + std.abs(vel4) * 0.85;
      const env4 =
        live4 * spread4 * (ringEnv4 * 0.85 + tailEnv4 * 0.15) * dirMask4 * str4;
      const safeR4 = std.max(r4, 0.0015);
      const amp4 = env4 * 0.012 * rippleGain;
      const disp4 = d.vec2f(
        (relX4 / safeR4) * wave4 * amp4,
        (relY4 / safeR4) * wave4 * amp4,
      );

      const age5 = params.time - params.ripple5t;
      const live5 =
        std.smoothstep(maxAge, maxAge * 0.58, age5) *
        std.smoothstep(-0.03, 0.04, age5);
      const oy5 = 1.0 - params.ripple5y;
      const relX5 = (sampleUv.x - params.ripple5x) * aspect;
      const relY5 = sampleUv.y - oy5;
      const r5 = std.length(d.vec2f(relX5, relY5));
      const vel5 = params.ripple5vx;
      const move5 = std.sign(vel5 + 0.0001);
      const ahead5 = relX5 * move5;
      const dirMask5 = std.smoothstep(0.06, -0.03, ahead5);
      const front5 = waveSpeed * age5;
      const ringW5 = 0.05 + age5 * 0.014;
      const ringEnv5 = std.smoothstep(ringW5, 0.0, std.abs(r5 - front5));
      const tailEnv5 = std.smoothstep(front5 + 0.07, front5 * 0.52, r5);
      const phase5 =
        r5 * waveK - age5 * waveK * waveSpeed * 0.82 + params.ripple5x * 21.3;
      const wave5 = std.sin(phase5) + std.sin(phase5 * 1.7 + age5 * 2.8) * 0.32;
      const spread5 = 1.0 / (1.0 + r5 * 1.0 + age5 * 0.55);
      const str5 = 0.5 + std.abs(vel5) * 0.85;
      const env5 =
        live5 * spread5 * (ringEnv5 * 0.85 + tailEnv5 * 0.15) * dirMask5 * str5;
      const safeR5 = std.max(r5, 0.0015);
      const amp5 = env5 * 0.012 * rippleGain;
      const disp5 = d.vec2f(
        (relX5 / safeR5) * wave5 * amp5,
        (relY5 / safeR5) * wave5 * amp5,
      );

      const age6 = params.time - params.ripple6t;
      const live6 =
        std.smoothstep(maxAge, maxAge * 0.58, age6) *
        std.smoothstep(-0.03, 0.04, age6);
      const oy6 = 1.0 - params.ripple6y;
      const relX6 = (sampleUv.x - params.ripple6x) * aspect;
      const relY6 = sampleUv.y - oy6;
      const r6 = std.length(d.vec2f(relX6, relY6));
      const vel6 = params.ripple6vx;
      const move6 = std.sign(vel6 + 0.0001);
      const ahead6 = relX6 * move6;
      const dirMask6 = std.smoothstep(0.06, -0.03, ahead6);
      const front6 = waveSpeed * age6;
      const ringW6 = 0.05 + age6 * 0.014;
      const ringEnv6 = std.smoothstep(ringW6, 0.0, std.abs(r6 - front6));
      const tailEnv6 = std.smoothstep(front6 + 0.07, front6 * 0.52, r6);
      const phase6 =
        r6 * waveK - age6 * waveK * waveSpeed * 0.82 + params.ripple6x * 21.3;
      const wave6 = std.sin(phase6) + std.sin(phase6 * 1.7 + age6 * 2.8) * 0.32;
      const spread6 = 1.0 / (1.0 + r6 * 1.0 + age6 * 0.55);
      const str6 = 0.5 + std.abs(vel6) * 0.85;
      const env6 =
        live6 * spread6 * (ringEnv6 * 0.85 + tailEnv6 * 0.15) * dirMask6 * str6;
      const safeR6 = std.max(r6, 0.0015);
      const amp6 = env6 * 0.012 * rippleGain;
      const disp6 = d.vec2f(
        (relX6 / safeR6) * wave6 * amp6,
        (relY6 / safeR6) * wave6 * amp6,
      );

      const age7 = params.time - params.ripple7t;
      const live7 =
        std.smoothstep(maxAge, maxAge * 0.58, age7) *
        std.smoothstep(-0.03, 0.04, age7);
      const oy7 = 1.0 - params.ripple7y;
      const relX7 = (sampleUv.x - params.ripple7x) * aspect;
      const relY7 = sampleUv.y - oy7;
      const r7 = std.length(d.vec2f(relX7, relY7));
      const vel7 = params.ripple7vx;
      const move7 = std.sign(vel7 + 0.0001);
      const ahead7 = relX7 * move7;
      const dirMask7 = std.smoothstep(0.06, -0.03, ahead7);
      const front7 = waveSpeed * age7;
      const ringW7 = 0.05 + age7 * 0.014;
      const ringEnv7 = std.smoothstep(ringW7, 0.0, std.abs(r7 - front7));
      const tailEnv7 = std.smoothstep(front7 + 0.07, front7 * 0.52, r7);
      const phase7 =
        r7 * waveK - age7 * waveK * waveSpeed * 0.82 + params.ripple7x * 21.3;
      const wave7 = std.sin(phase7) + std.sin(phase7 * 1.7 + age7 * 2.8) * 0.32;
      const spread7 = 1.0 / (1.0 + r7 * 1.0 + age7 * 0.55);
      const str7 = 0.5 + std.abs(vel7) * 0.85;
      const env7 =
        live7 * spread7 * (ringEnv7 * 0.85 + tailEnv7 * 0.15) * dirMask7 * str7;
      const safeR7 = std.max(r7, 0.0015);
      const amp7 = env7 * 0.012 * rippleGain;
      const disp7 = d.vec2f(
        (relX7 / safeR7) * wave7 * amp7,
        (relY7 / safeR7) * wave7 * amp7,
      );

      const age8 = params.time - params.ripple8t;
      const live8 =
        std.smoothstep(maxAge, maxAge * 0.58, age8) *
        std.smoothstep(-0.03, 0.04, age8);
      const oy8 = 1.0 - params.ripple8y;
      const relX8 = (sampleUv.x - params.ripple8x) * aspect;
      const relY8 = sampleUv.y - oy8;
      const r8 = std.length(d.vec2f(relX8, relY8));
      const vel8 = params.ripple8vx;
      const move8 = std.sign(vel8 + 0.0001);
      const ahead8 = relX8 * move8;
      const dirMask8 = std.smoothstep(0.06, -0.03, ahead8);
      const front8 = waveSpeed * age8;
      const ringW8 = 0.05 + age8 * 0.014;
      const ringEnv8 = std.smoothstep(ringW8, 0.0, std.abs(r8 - front8));
      const tailEnv8 = std.smoothstep(front8 + 0.07, front8 * 0.52, r8);
      const phase8 =
        r8 * waveK - age8 * waveK * waveSpeed * 0.82 + params.ripple8x * 21.3;
      const wave8 = std.sin(phase8) + std.sin(phase8 * 1.7 + age8 * 2.8) * 0.32;
      const spread8 = 1.0 / (1.0 + r8 * 1.0 + age8 * 0.55);
      const str8 = 0.5 + std.abs(vel8) * 0.85;
      const env8 =
        live8 * spread8 * (ringEnv8 * 0.85 + tailEnv8 * 0.15) * dirMask8 * str8;
      const safeR8 = std.max(r8, 0.0015);
      const amp8 = env8 * 0.012 * rippleGain;
      const disp8 = d.vec2f(
        (relX8 / safeR8) * wave8 * amp8,
        (relY8 / safeR8) * wave8 * amp8,
      );

      const age9 = params.time - params.ripple9t;
      const live9 =
        std.smoothstep(maxAge, maxAge * 0.58, age9) *
        std.smoothstep(-0.03, 0.04, age9);
      const oy9 = 1.0 - params.ripple9y;
      const relX9 = (sampleUv.x - params.ripple9x) * aspect;
      const relY9 = sampleUv.y - oy9;
      const r9 = std.length(d.vec2f(relX9, relY9));
      const vel9 = params.ripple9vx;
      const move9 = std.sign(vel9 + 0.0001);
      const ahead9 = relX9 * move9;
      const dirMask9 = std.smoothstep(0.06, -0.03, ahead9);
      const front9 = waveSpeed * age9;
      const ringW9 = 0.05 + age9 * 0.014;
      const ringEnv9 = std.smoothstep(ringW9, 0.0, std.abs(r9 - front9));
      const tailEnv9 = std.smoothstep(front9 + 0.07, front9 * 0.52, r9);
      const phase9 =
        r9 * waveK - age9 * waveK * waveSpeed * 0.82 + params.ripple9x * 21.3;
      const wave9 = std.sin(phase9) + std.sin(phase9 * 1.7 + age9 * 2.8) * 0.32;
      const spread9 = 1.0 / (1.0 + r9 * 1.0 + age9 * 0.55);
      const str9 = 0.5 + std.abs(vel9) * 0.85;
      const env9 =
        live9 * spread9 * (ringEnv9 * 0.85 + tailEnv9 * 0.15) * dirMask9 * str9;
      const safeR9 = std.max(r9, 0.0015);
      const amp9 = env9 * 0.012 * rippleGain;
      const disp9 = d.vec2f(
        (relX9 / safeR9) * wave9 * amp9,
        (relY9 / safeR9) * wave9 * amp9,
      );

      const coverBase = sampleUv.sub(coverHalf).div(coverScale).add(coverHalf);
      const videoSampleUv = coverBase
        .add(disp0)
        .add(disp1)
        .add(disp2)
        .add(disp3)
        .add(disp4)
        .add(disp5)
        .add(disp6)
        .add(disp7)
        .add(disp8)
        .add(disp9);

      // --- video sample, cover UV, stacked effect toggles ---
      const source = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        videoSampleUv,
      );

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
      const dist = std.length(uv.sub(d.vec2f(0.5, 0.5)));
      const vignette = 1.0 - dist * 0.85;
      const scan = std.sin(uv.y * 420.0 + params.time * 6.0) * 0.025;
      const graded = d
        .vec4f(
          std.clamp(warm.x + scan, 0.0, 1.0),
          std.clamp(warm.y + scan, 0.0, 1.0),
          std.clamp(warm.z + scan, 0.0, 1.0),
          source.a,
        )
        .mul(vignette);

      const pulse = std.sin(params.time * 3.5) * 0.07;

      const afterVignette = std.mix(source, graded, fxVignette);
      const invertedStack = d.vec4f(
        d.vec3f(1.0, 1.0, 1.0).sub(afterVignette.rgb),
        afterVignette.a,
      );
      const afterInvert = std.mix(afterVignette, invertedStack, fxInvert);
      const lumaStack =
        afterInvert.r * 0.2126 +
        afterInvert.g * 0.7152 +
        afterInvert.b * 0.0722;
      const bwStack = std.smoothstep(0.3, 0.72, lumaStack);
      const noirStack = d.vec4f(bwStack, bwStack, bwStack, afterInvert.a);
      const afterNoir = std.mix(afterInvert, noirStack, fxNoir);
      const neonStack = d.vec4f(
        std.clamp(afterNoir.r * 1.38 + pulse, 0.0, 1.0),
        std.clamp(afterNoir.g * 0.72 + 0.06, 0.0, 1.0),
        std.clamp(afterNoir.b * 1.52 - pulse, 0.0, 1.0),
        afterNoir.a,
      );
      const baseColor = std.mix(afterNoir, neonStack, fxNeon);

      const sceneLuma =
        baseColor.r * 0.2126 + baseColor.g * 0.7152 + baseColor.b * 0.0722;
      const shadowScale = std.mix(
        1.0,
        0.25,
        std.smoothstep(0.4, 0.82, sceneLuma),
      );

      // --- play / pause glass control ---
      const playCenterY = 0.105;
      const playRadiusUv = 0.062 / aspect;
      const playCenterX = 0.94 - playRadiusUv;
      const playP = d.vec2f(
        (uv.x - playCenterX) * aspect,
        screenY - playCenterY,
      );
      const playDist = std.length(playP) - 0.062;
      const playMask = std.smoothstep(0.0035, -0.0035, playDist);
      const playInnerRim = std.smoothstep(0.005, 0.0, playDist);
      const playRel = playP.div(0.062);
      const playR2 = std.min(std.dot(playRel, playRel), 1.0);
      const playR = std.sqrt(playR2);
      const playBtnUv = d.vec2f(playCenterX, 1.0 - playCenterY);
      const playOffset = sampleUv.sub(playBtnUv);
      const playZoom = 1.0 + 2.75 * std.max(0.0, 1.0 - playR) * playMask;
      const playBarrel = 1.0 + 1.15 * playR2 * playMask;
      const playGlassUv = playBtnUv.add(
        playOffset.div(playZoom).mul(playBarrel),
      );
      const playVideoUv = playGlassUv
        .sub(coverHalf)
        .div(coverScale)
        .add(coverHalf);
      const playTap = 0.0016;
      const playS0 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        playVideoUv,
      );
      const playS1 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        playVideoUv.add(d.vec2f(playTap, 0.0)),
      );
      const playS2 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        playVideoUv.sub(d.vec2f(playTap, 0.0)),
      );
      const playBlur = playS0.mul(0.52).add(playS1.add(playS2).mul(0.24));
      const playZ = std.sqrt(std.max(0.0, 1.0 - playR2));
      const playNdot = std.max(
        0.0,
        playRel.x * -0.62 + playRel.y * 0.74 + playZ * 0.85,
      );
      const playSpec = std.pow(playNdot, 18.0) * 0.22;
      const playStreakC = playRel.x * -0.9 + playRel.y * 0.95;
      const playStreak =
        std.smoothstep(0.55, 0.88, playStreakC) *
        std.smoothstep(0.98, 0.72, playStreakC) *
        std.smoothstep(0.8, 0.25, playR) *
        0.18;
      const playBlob = std.smoothstep(
        0.32,
        0.0,
        std.length(playRel.sub(d.vec2f(-0.24, 0.16))),
      );
      const playShade =
        std.smoothstep(0.55, -0.55, playRel.y) * 0.28 +
        std.pow(1.0 - playZ, 2.2) * 0.22;
      const playPauseL = std.max(
        std.abs(playRel.x + 0.13) - 0.1,
        std.abs(playRel.y) - 0.34,
      );
      const playPauseR = std.max(
        std.abs(playRel.x - 0.13) - 0.1,
        std.abs(playRel.y) - 0.34,
      );
      const pauseIcon = std.smoothstep(
        0.028,
        -0.016,
        std.min(playPauseL, playPauseR),
      );
      const playTriSdf = std.max(
        playRel.x - 0.3,
        std.max(
          -playRel.x - 0.05,
          std.abs(playRel.y) -
            0.34 * std.clamp((0.3 - playRel.x) / 0.35, 0.0, 1.0),
        ),
      );
      const playIconOnly = std.smoothstep(0.024, -0.014, playTriSdf);
      const playIcon = std.mix(playIconOnly, pauseIcon, params.playing);
      const playSmoked = playBlur.rgb
        .mul(d.vec3f(0.74, 0.76, 0.8))
        .add(d.vec3f(0.14, 0.15, 0.17));
      const playDome = playSmoked.sub(d.vec3f(0.06, 0.07, 0.09).mul(playShade));
      const playHi = std.min(
        playStreak + playBlob * 0.08 + playSpec + playInnerRim * 0.1,
        0.42,
      );
      const playGlassRgb = std.mix(
        std.mix(playDome, d.vec3f(0.94, 0.95, 0.97), playHi * playMask),
        d.vec3f(0.98, 0.99, 1.0),
        playIcon,
      );
      const playMix = playMask * 0.86;
      const playContact =
        std.smoothstep(0.014, 0.002, playDist) * (1.0 - playMask) * 0.085;
      const playSoftP = playP.sub(d.vec2f(0.0, -0.011));
      const playSoftDist = std.length(playSoftP) - 0.062 * 1.05;
      const playSoft =
        (1.0 - std.smoothstep(-0.012, 0.034, playSoftDist)) *
        (1.0 - playMask) *
        0.045;
      const playDrop = (playContact + playSoft) * shadowScale;

      // --- effect toggle glass capsules (UV anchors match videoEffectModes.ts) ---
      const fx0P = d.vec2f((uv.x - 0.09) * aspect, screenY - 0.398);
      const fx0Ext = d.vec2f(0.114, 0.032);
      const fx0Corner = 0.032;
      const fx0Abs = d.vec2f(std.abs(fx0P.x), std.abs(fx0P.y));
      const fx0Q = fx0Abs.sub(fx0Ext).add(d.vec2f(fx0Corner, fx0Corner));
      const fx0Dist =
        std.length(std.max(fx0Q, d.vec2f(0.0, 0.0))) +
        std.min(std.max(fx0Q.x, fx0Q.y), 0.0) -
        fx0Corner;
      const fx0Mask = std.smoothstep(0.0035, -0.0035, fx0Dist);
      const fx0Inner = std.smoothstep(0.005, 0.0, fx0Dist);
      const fx0Rel = d.vec2f(fx0P.x / fx0Ext.x, fx0P.y / fx0Ext.y);
      const fx0R2 = std.min(std.dot(fx0Rel, fx0Rel), 1.0);
      const fx0R = std.sqrt(fx0R2);
      const fx0BtnUv = d.vec2f(0.09, 1.0 - 0.398);
      const fx0Off = sampleUv.sub(fx0BtnUv);
      const fx0Zoom = 1.0 + 2.75 * std.max(0.0, 1.0 - fx0R) * fx0Mask;
      const fx0Barrel = 1.0 + 1.15 * fx0R2 * fx0Mask;
      const fx0GlassUv = fx0BtnUv.add(fx0Off.div(fx0Zoom).mul(fx0Barrel));
      const fx0VideoUv = fx0GlassUv
        .sub(coverHalf)
        .div(coverScale)
        .add(coverHalf);
      const fx0S0 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fx0VideoUv,
      );
      const fx0S1 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fx0VideoUv.add(d.vec2f(0.0016, 0.0)),
      );
      const fx0S2 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fx0VideoUv.sub(d.vec2f(0.0016, 0.0)),
      );
      const fx0Blur = fx0S0.mul(0.52).add(fx0S1.add(fx0S2).mul(0.24));
      const fx0Z = std.sqrt(std.max(0.0, 1.0 - fx0R2));
      const fx0Ndot = std.max(
        0.0,
        fx0Rel.x * -0.62 + fx0Rel.y * 0.74 + fx0Z * 0.85,
      );
      const fx0Spec = std.pow(fx0Ndot, 18.0) * 0.22;
      const fx0StreakC = fx0Rel.x * -0.9 + fx0Rel.y * 0.95;
      const fx0Streak =
        std.smoothstep(0.55, 0.88, fx0StreakC) *
        std.smoothstep(0.98, 0.72, fx0StreakC) *
        std.smoothstep(0.8, 0.25, fx0R) *
        0.18;
      const fx0Blob = std.smoothstep(
        0.32,
        0.0,
        std.length(fx0Rel.sub(d.vec2f(-0.24, 0.16))),
      );
      const fx0Shade =
        std.smoothstep(0.55, -0.55, fx0Rel.y) * 0.28 +
        std.pow(1.0 - fx0Z, 2.2) * 0.22;
      const fx0Smoked = fx0Blur.rgb
        .mul(d.vec3f(0.74, 0.76, 0.8))
        .add(d.vec3f(0.14, 0.15, 0.17));
      const fx0Dome = fx0Smoked.sub(d.vec3f(0.06, 0.07, 0.09).mul(fx0Shade));
      const fx0Hi = std.min(
        fx0Streak + fx0Blob * 0.08 + fx0Spec + fx0Inner * 0.1,
        0.42,
      );
      const fx0GlassBase = std.mix(
        fx0Dome,
        d.vec3f(0.94, 0.95, 0.97),
        fx0Hi * fx0Mask,
      );
      const fx0Ring = std.smoothstep(0.006, 0.0, fx0Dist - 0.002);
      const fx0GlassRgb = std.mix(
        fx0GlassBase,
        d.vec3f(0.72, 0.88, 1.0),
        fx0Ring * fxVignette * 0.55,
      );
      const fx0Mix = fx0Mask * 0.86;
      const fx0Contact =
        std.smoothstep(0.012, 0.002, fx0Dist) * (1.0 - fx0Mask) * 0.07;
      const fx0ShadowP = fx0P.sub(d.vec2f(0.0, -0.01));
      const fx0ShadowAbs = d.vec2f(
        std.abs(fx0ShadowP.x),
        std.abs(fx0ShadowP.y),
      );
      const fx0ShadowQ = fx0ShadowAbs
        .sub(fx0Ext)
        .add(d.vec2f(fx0Corner, fx0Corner));
      const fx0ShadowDist =
        std.length(std.max(fx0ShadowQ, d.vec2f(0.0, 0.0))) +
        std.min(std.max(fx0ShadowQ.x, fx0ShadowQ.y), 0.0) -
        fx0Corner;
      const fx0Soft =
        (1.0 - std.smoothstep(-0.012, 0.032, fx0ShadowDist)) *
        (1.0 - fx0Mask) *
        0.038;
      const fx0Drop = (fx0Contact + fx0Soft) * shadowScale;

      const fx1P = d.vec2f((uv.x - 0.09) * aspect, screenY - 0.476);
      const fx1Ext = d.vec2f(0.114, 0.032);
      const fx1Corner = 0.032;
      const fx1Abs = d.vec2f(std.abs(fx1P.x), std.abs(fx1P.y));
      const fx1Q = fx1Abs.sub(fx1Ext).add(d.vec2f(fx1Corner, fx1Corner));
      const fx1Dist =
        std.length(std.max(fx1Q, d.vec2f(0.0, 0.0))) +
        std.min(std.max(fx1Q.x, fx1Q.y), 0.0) -
        fx1Corner;
      const fx1Mask = std.smoothstep(0.0035, -0.0035, fx1Dist);
      const fx1Inner = std.smoothstep(0.005, 0.0, fx1Dist);
      const fx1Rel = d.vec2f(fx1P.x / fx1Ext.x, fx1P.y / fx1Ext.y);
      const fx1R2 = std.min(std.dot(fx1Rel, fx1Rel), 1.0);
      const fx1R = std.sqrt(fx1R2);
      const fx1BtnUv = d.vec2f(0.09, 1.0 - 0.476);
      const fx1Off = sampleUv.sub(fx1BtnUv);
      const fx1Zoom = 1.0 + 2.75 * std.max(0.0, 1.0 - fx1R) * fx1Mask;
      const fx1Barrel = 1.0 + 1.15 * fx1R2 * fx1Mask;
      const fx1GlassUv = fx1BtnUv.add(fx1Off.div(fx1Zoom).mul(fx1Barrel));
      const fx1VideoUv = fx1GlassUv
        .sub(coverHalf)
        .div(coverScale)
        .add(coverHalf);
      const fx1S0 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fx1VideoUv,
      );
      const fx1S1 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fx1VideoUv.add(d.vec2f(0.0016, 0.0)),
      );
      const fx1S2 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fx1VideoUv.sub(d.vec2f(0.0016, 0.0)),
      );
      const fx1Blur = fx1S0.mul(0.52).add(fx1S1.add(fx1S2).mul(0.24));
      const fx1Z = std.sqrt(std.max(0.0, 1.0 - fx1R2));
      const fx1Ndot = std.max(
        0.0,
        fx1Rel.x * -0.62 + fx1Rel.y * 0.74 + fx1Z * 0.85,
      );
      const fx1Spec = std.pow(fx1Ndot, 18.0) * 0.22;
      const fx1StreakC = fx1Rel.x * -0.9 + fx1Rel.y * 0.95;
      const fx1Streak =
        std.smoothstep(0.55, 0.88, fx1StreakC) *
        std.smoothstep(0.98, 0.72, fx1StreakC) *
        std.smoothstep(0.8, 0.25, fx1R) *
        0.18;
      const fx1Blob = std.smoothstep(
        0.32,
        0.0,
        std.length(fx1Rel.sub(d.vec2f(-0.24, 0.16))),
      );
      const fx1Shade =
        std.smoothstep(0.55, -0.55, fx1Rel.y) * 0.28 +
        std.pow(1.0 - fx1Z, 2.2) * 0.22;
      const fx1Smoked = fx1Blur.rgb
        .mul(d.vec3f(0.74, 0.76, 0.8))
        .add(d.vec3f(0.14, 0.15, 0.17));
      const fx1Dome = fx1Smoked.sub(d.vec3f(0.06, 0.07, 0.09).mul(fx1Shade));
      const fx1Hi = std.min(
        fx1Streak + fx1Blob * 0.08 + fx1Spec + fx1Inner * 0.1,
        0.42,
      );
      const fx1GlassBase = std.mix(
        fx1Dome,
        d.vec3f(0.94, 0.95, 0.97),
        fx1Hi * fx1Mask,
      );
      const fx1Ring = std.smoothstep(0.006, 0.0, fx1Dist - 0.002);
      const fx1GlassRgb = std.mix(
        fx1GlassBase,
        d.vec3f(0.72, 0.88, 1.0),
        fx1Ring * fxInvert * 0.55,
      );
      const fx1Mix = fx1Mask * 0.86;
      const fx1Contact =
        std.smoothstep(0.012, 0.002, fx1Dist) * (1.0 - fx1Mask) * 0.07;
      const fx1ShadowP = fx1P.sub(d.vec2f(0.0, -0.01));
      const fx1ShadowAbs = d.vec2f(
        std.abs(fx1ShadowP.x),
        std.abs(fx1ShadowP.y),
      );
      const fx1ShadowQ = fx1ShadowAbs
        .sub(fx1Ext)
        .add(d.vec2f(fx1Corner, fx1Corner));
      const fx1ShadowDist =
        std.length(std.max(fx1ShadowQ, d.vec2f(0.0, 0.0))) +
        std.min(std.max(fx1ShadowQ.x, fx1ShadowQ.y), 0.0) -
        fx1Corner;
      const fx1Soft =
        (1.0 - std.smoothstep(-0.012, 0.032, fx1ShadowDist)) *
        (1.0 - fx1Mask) *
        0.038;
      const fx1Drop = (fx1Contact + fx1Soft) * shadowScale;

      const fx2P = d.vec2f((uv.x - 0.09) * aspect, screenY - 0.554);
      const fx2Ext = d.vec2f(0.114, 0.032);
      const fx2Corner = 0.032;
      const fx2Abs = d.vec2f(std.abs(fx2P.x), std.abs(fx2P.y));
      const fx2Q = fx2Abs.sub(fx2Ext).add(d.vec2f(fx2Corner, fx2Corner));
      const fx2Dist =
        std.length(std.max(fx2Q, d.vec2f(0.0, 0.0))) +
        std.min(std.max(fx2Q.x, fx2Q.y), 0.0) -
        fx2Corner;
      const fx2Mask = std.smoothstep(0.0035, -0.0035, fx2Dist);
      const fx2Inner = std.smoothstep(0.005, 0.0, fx2Dist);
      const fx2Rel = d.vec2f(fx2P.x / fx2Ext.x, fx2P.y / fx2Ext.y);
      const fx2R2 = std.min(std.dot(fx2Rel, fx2Rel), 1.0);
      const fx2R = std.sqrt(fx2R2);
      const fx2BtnUv = d.vec2f(0.09, 1.0 - 0.554);
      const fx2Off = sampleUv.sub(fx2BtnUv);
      const fx2Zoom = 1.0 + 2.75 * std.max(0.0, 1.0 - fx2R) * fx2Mask;
      const fx2Barrel = 1.0 + 1.15 * fx2R2 * fx2Mask;
      const fx2GlassUv = fx2BtnUv.add(fx2Off.div(fx2Zoom).mul(fx2Barrel));
      const fx2VideoUv = fx2GlassUv
        .sub(coverHalf)
        .div(coverScale)
        .add(coverHalf);
      const fx2S0 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fx2VideoUv,
      );
      const fx2S1 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fx2VideoUv.add(d.vec2f(0.0016, 0.0)),
      );
      const fx2S2 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fx2VideoUv.sub(d.vec2f(0.0016, 0.0)),
      );
      const fx2Blur = fx2S0.mul(0.52).add(fx2S1.add(fx2S2).mul(0.24));
      const fx2Z = std.sqrt(std.max(0.0, 1.0 - fx2R2));
      const fx2Ndot = std.max(
        0.0,
        fx2Rel.x * -0.62 + fx2Rel.y * 0.74 + fx2Z * 0.85,
      );
      const fx2Spec = std.pow(fx2Ndot, 18.0) * 0.22;
      const fx2StreakC = fx2Rel.x * -0.9 + fx2Rel.y * 0.95;
      const fx2Streak =
        std.smoothstep(0.55, 0.88, fx2StreakC) *
        std.smoothstep(0.98, 0.72, fx2StreakC) *
        std.smoothstep(0.8, 0.25, fx2R) *
        0.18;
      const fx2Blob = std.smoothstep(
        0.32,
        0.0,
        std.length(fx2Rel.sub(d.vec2f(-0.24, 0.16))),
      );
      const fx2Shade =
        std.smoothstep(0.55, -0.55, fx2Rel.y) * 0.28 +
        std.pow(1.0 - fx2Z, 2.2) * 0.22;
      const fx2Smoked = fx2Blur.rgb
        .mul(d.vec3f(0.74, 0.76, 0.8))
        .add(d.vec3f(0.14, 0.15, 0.17));
      const fx2Dome = fx2Smoked.sub(d.vec3f(0.06, 0.07, 0.09).mul(fx2Shade));
      const fx2Hi = std.min(
        fx2Streak + fx2Blob * 0.08 + fx2Spec + fx2Inner * 0.1,
        0.42,
      );
      const fx2GlassBase = std.mix(
        fx2Dome,
        d.vec3f(0.94, 0.95, 0.97),
        fx2Hi * fx2Mask,
      );
      const fx2Ring = std.smoothstep(0.006, 0.0, fx2Dist - 0.002);
      const fx2GlassRgb = std.mix(
        fx2GlassBase,
        d.vec3f(0.72, 0.88, 1.0),
        fx2Ring * fxNoir * 0.55,
      );
      const fx2Mix = fx2Mask * 0.86;
      const fx2Contact =
        std.smoothstep(0.012, 0.002, fx2Dist) * (1.0 - fx2Mask) * 0.07;
      const fx2ShadowP = fx2P.sub(d.vec2f(0.0, -0.01));
      const fx2ShadowAbs = d.vec2f(
        std.abs(fx2ShadowP.x),
        std.abs(fx2ShadowP.y),
      );
      const fx2ShadowQ = fx2ShadowAbs
        .sub(fx2Ext)
        .add(d.vec2f(fx2Corner, fx2Corner));
      const fx2ShadowDist =
        std.length(std.max(fx2ShadowQ, d.vec2f(0.0, 0.0))) +
        std.min(std.max(fx2ShadowQ.x, fx2ShadowQ.y), 0.0) -
        fx2Corner;
      const fx2Soft =
        (1.0 - std.smoothstep(-0.012, 0.032, fx2ShadowDist)) *
        (1.0 - fx2Mask) *
        0.038;
      const fx2Drop = (fx2Contact + fx2Soft) * shadowScale;

      const fx3P = d.vec2f((uv.x - 0.09) * aspect, screenY - 0.632);
      const fx3Ext = d.vec2f(0.114, 0.032);
      const fx3Corner = 0.032;
      const fx3Abs = d.vec2f(std.abs(fx3P.x), std.abs(fx3P.y));
      const fx3Q = fx3Abs.sub(fx3Ext).add(d.vec2f(fx3Corner, fx3Corner));
      const fx3Dist =
        std.length(std.max(fx3Q, d.vec2f(0.0, 0.0))) +
        std.min(std.max(fx3Q.x, fx3Q.y), 0.0) -
        fx3Corner;
      const fx3Mask = std.smoothstep(0.0035, -0.0035, fx3Dist);
      const fx3Inner = std.smoothstep(0.005, 0.0, fx3Dist);
      const fx3Rel = d.vec2f(fx3P.x / fx3Ext.x, fx3P.y / fx3Ext.y);
      const fx3R2 = std.min(std.dot(fx3Rel, fx3Rel), 1.0);
      const fx3R = std.sqrt(fx3R2);
      const fx3BtnUv = d.vec2f(0.09, 1.0 - 0.632);
      const fx3Off = sampleUv.sub(fx3BtnUv);
      const fx3Zoom = 1.0 + 2.75 * std.max(0.0, 1.0 - fx3R) * fx3Mask;
      const fx3Barrel = 1.0 + 1.15 * fx3R2 * fx3Mask;
      const fx3GlassUv = fx3BtnUv.add(fx3Off.div(fx3Zoom).mul(fx3Barrel));
      const fx3VideoUv = fx3GlassUv
        .sub(coverHalf)
        .div(coverScale)
        .add(coverHalf);
      const fx3S0 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fx3VideoUv,
      );
      const fx3S1 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fx3VideoUv.add(d.vec2f(0.0016, 0.0)),
      );
      const fx3S2 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fx3VideoUv.sub(d.vec2f(0.0016, 0.0)),
      );
      const fx3Blur = fx3S0.mul(0.52).add(fx3S1.add(fx3S2).mul(0.24));
      const fx3Z = std.sqrt(std.max(0.0, 1.0 - fx3R2));
      const fx3Ndot = std.max(
        0.0,
        fx3Rel.x * -0.62 + fx3Rel.y * 0.74 + fx3Z * 0.85,
      );
      const fx3Spec = std.pow(fx3Ndot, 18.0) * 0.22;
      const fx3StreakC = fx3Rel.x * -0.9 + fx3Rel.y * 0.95;
      const fx3Streak =
        std.smoothstep(0.55, 0.88, fx3StreakC) *
        std.smoothstep(0.98, 0.72, fx3StreakC) *
        std.smoothstep(0.8, 0.25, fx3R) *
        0.18;
      const fx3Blob = std.smoothstep(
        0.32,
        0.0,
        std.length(fx3Rel.sub(d.vec2f(-0.24, 0.16))),
      );
      const fx3Shade =
        std.smoothstep(0.55, -0.55, fx3Rel.y) * 0.28 +
        std.pow(1.0 - fx3Z, 2.2) * 0.22;
      const fx3Smoked = fx3Blur.rgb
        .mul(d.vec3f(0.74, 0.76, 0.8))
        .add(d.vec3f(0.14, 0.15, 0.17));
      const fx3Dome = fx3Smoked.sub(d.vec3f(0.06, 0.07, 0.09).mul(fx3Shade));
      const fx3Hi = std.min(
        fx3Streak + fx3Blob * 0.08 + fx3Spec + fx3Inner * 0.1,
        0.42,
      );
      const fx3GlassBase = std.mix(
        fx3Dome,
        d.vec3f(0.94, 0.95, 0.97),
        fx3Hi * fx3Mask,
      );
      const fx3Ring = std.smoothstep(0.006, 0.0, fx3Dist - 0.002);
      const fx3GlassRgb = std.mix(
        fx3GlassBase,
        d.vec3f(0.72, 0.88, 1.0),
        fx3Ring * fxNeon * 0.55,
      );
      const fx3Mix = fx3Mask * 0.86;
      const fx3Contact =
        std.smoothstep(0.012, 0.002, fx3Dist) * (1.0 - fx3Mask) * 0.07;
      const fx3ShadowP = fx3P.sub(d.vec2f(0.0, -0.01));
      const fx3ShadowAbs = d.vec2f(
        std.abs(fx3ShadowP.x),
        std.abs(fx3ShadowP.y),
      );
      const fx3ShadowQ = fx3ShadowAbs
        .sub(fx3Ext)
        .add(d.vec2f(fx3Corner, fx3Corner));
      const fx3ShadowDist =
        std.length(std.max(fx3ShadowQ, d.vec2f(0.0, 0.0))) +
        std.min(std.max(fx3ShadowQ.x, fx3ShadowQ.y), 0.0) -
        fx3Corner;
      const fx3Soft =
        (1.0 - std.smoothstep(-0.012, 0.032, fx3ShadowDist)) *
        (1.0 - fx3Mask) *
        0.038;
      const fx3Drop = (fx3Contact + fx3Soft) * shadowScale;

      // --- scrubber track, fill, thumb ---
      const scrubProgress = std.clamp(params.videoProgress, 0.0, 1.0);
      const scrubCenterY = 0.105;
      const scrubPlayRadiusUv = 0.062 / aspect;
      const scrubPlayCenterX = 0.94 - scrubPlayRadiusUv;
      const scrubLeft = 0.06;
      const scrubRight = scrubPlayCenterX - 0.016 - scrubPlayRadiusUv;
      const scrubCenterX = (scrubLeft + scrubRight) * 0.5;
      const scrubHalfW = (scrubRight - scrubLeft) * 0.5;
      const scrubHalfH = 0.015;
      const scrubCorner = 0.015;
      const scrubP = d.vec2f(
        (uv.x - scrubCenterX) * aspect,
        screenY - scrubCenterY,
      );
      const scrubExt = d.vec2f(scrubHalfW * aspect, scrubHalfH);
      const scrubAbs = d.vec2f(std.abs(scrubP.x), std.abs(scrubP.y));
      const scrubQ = scrubAbs
        .sub(scrubExt)
        .add(d.vec2f(scrubCorner, scrubCorner));
      const scrubDist =
        std.length(std.max(scrubQ, d.vec2f(0.0, 0.0))) +
        std.min(std.max(scrubQ.x, scrubQ.y), 0.0) -
        scrubCorner;
      const scrubMask = std.smoothstep(0.0035, -0.0035, scrubDist);
      const scrubInner = std.smoothstep(0.005, 0.0, scrubDist);

      const thumbRadius = 0.034;
      const thumbRadiusUv = thumbRadius / aspect;
      const scrubFillX = scrubLeft + scrubProgress * (scrubRight - scrubLeft);
      const thumbX = scrubFillX;
      const thumbP = d.vec2f((uv.x - thumbX) * aspect, screenY - scrubCenterY);
      const thumbDist = std.length(thumbP) - thumbRadius;
      const thumbMask = std.smoothstep(0.0035, -0.0035, thumbDist);

      const scrubRel = d.vec2f(scrubP.x / scrubExt.x, scrubP.y / scrubExt.y);
      const scrubR2 = std.min(std.dot(scrubRel, scrubRel), 1.0);
      const scrubR = std.sqrt(scrubR2);
      const scrubBtnUv = d.vec2f(scrubCenterX, 1.0 - scrubCenterY);
      const scrubOff = sampleUv.sub(scrubBtnUv);
      const scrubPinch = 1.0 - 1.65 * std.max(0.0, 1.0 - scrubR) * scrubMask;
      const scrubBarrel = 1.0 - 0.85 * scrubR2 * scrubMask;
      const scrubGlassUv = scrubBtnUv.add(
        scrubOff.div(scrubPinch).mul(scrubBarrel),
      );
      const scrubVideoUv = scrubGlassUv
        .sub(coverHalf)
        .div(coverScale)
        .add(coverHalf);
      const scrubTap = 0.0018;
      const scrubS0 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        scrubVideoUv,
      );
      const scrubS1 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        scrubVideoUv.add(d.vec2f(scrubTap, 0.0)),
      );
      const scrubS2 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        scrubVideoUv.sub(d.vec2f(scrubTap, 0.0)),
      );
      const scrubBlur = scrubS0.mul(0.52).add(scrubS1.add(scrubS2).mul(0.24));
      const scrubZ = std.sqrt(std.max(0.0, 1.0 - scrubR2));
      const scrubSmoked = scrubBlur.rgb
        .mul(d.vec3f(0.4, 0.43, 0.48))
        .add(d.vec3f(0.05, 0.055, 0.06));
      const scrubCavity =
        std.pow(scrubZ, 1.55) * 0.42 +
        std.smoothstep(0.42, -0.42, scrubRel.y) * 0.24;
      const scrubGroove = scrubSmoked.sub(
        d.vec3f(0.15, 0.16, 0.18).mul(scrubCavity),
      );
      const scrubLip =
        std.smoothstep(0.009, 0.0, scrubDist) * 0.14 +
        std.smoothstep(-0.55, 0.35, scrubRel.y) * 0.06;
      const scrubTrackRgb = std.mix(
        scrubGroove,
        d.vec3f(0.68, 0.7, 0.74),
        std.min(scrubLip, 0.22) * scrubMask,
      );
      const scrubTrackMix = scrubMask * (1.0 - thumbMask * 0.9) * 0.88;

      const thumbRel = thumbP.div(thumbRadius);
      const thumbR2 = std.min(std.dot(thumbRel, thumbRel), 1.0);
      const thumbR = std.sqrt(thumbR2);

      const fillSpanUv = std.max(thumbX - scrubLeft, 0.001);
      const fillCenterX = scrubLeft + fillSpanUv * 0.5;
      const fillHalfWUv = fillSpanUv * 0.5;
      const fillP = d.vec2f(
        (uv.x - fillCenterX) * aspect,
        screenY - scrubCenterY,
      );
      const fillExt = d.vec2f(fillHalfWUv * aspect, scrubHalfH);
      const fillAbs = d.vec2f(std.abs(fillP.x), std.abs(fillP.y));
      const fillQ = fillAbs.sub(fillExt).add(d.vec2f(scrubCorner, scrubCorner));
      const fillDist =
        std.length(std.max(fillQ, d.vec2f(0.0, 0.0))) +
        std.min(std.max(fillQ.x, fillQ.y), 0.0) -
        scrubCorner;
      const fillCapsuleMask = std.smoothstep(0.0035, -0.0035, fillDist);
      const fillVisible = std.smoothstep(0.006, 0.018, fillSpanUv);
      const fillMask = fillCapsuleMask * fillVisible;
      const fillRel = d.vec2f(fillP.x / fillExt.x, fillP.y / fillExt.y);
      const fillR2 = std.min(std.dot(fillRel, fillRel), 1.0);
      const fillR = std.sqrt(fillR2);
      const fillInner = std.smoothstep(0.005, 0.0, fillDist);
      const fillBtnUv = d.vec2f(fillCenterX, 1.0 - scrubCenterY);
      const fillOff = sampleUv.sub(fillBtnUv);
      const fillZoom = 1.0 + 2.35 * std.max(0.0, 1.0 - fillR) * fillMask;
      const fillBarrel = 1.0 + 1.05 * fillR2 * fillMask;
      const fillGlassUv = fillBtnUv.add(fillOff.div(fillZoom).mul(fillBarrel));
      const fillVideoUv = fillGlassUv
        .sub(coverHalf)
        .div(coverScale)
        .add(coverHalf);
      const fillS0 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fillVideoUv,
      );
      const fillS1 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fillVideoUv.add(d.vec2f(scrubTap, 0.0)),
      );
      const fillS2 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        fillVideoUv.sub(d.vec2f(scrubTap, 0.0)),
      );
      const fillBlur = fillS0.mul(0.52).add(fillS1.add(fillS2).mul(0.24));
      const fillZ = std.sqrt(std.max(0.0, 1.0 - fillR2));
      const fillNdot = std.max(
        0.0,
        fillRel.x * -0.62 + fillRel.y * 0.74 + fillZ * 0.85,
      );
      const fillSpec = std.pow(fillNdot, 16.0) * 0.3;
      const fillStreakC = fillRel.x * -0.9 + fillRel.y * 0.95;
      const fillStreak =
        std.smoothstep(0.55, 0.88, fillStreakC) *
        std.smoothstep(0.98, 0.72, fillStreakC) *
        std.smoothstep(0.82, 0.22, fillR) *
        0.22;
      const fillShade =
        std.smoothstep(0.55, -0.55, fillRel.y) * 0.26 +
        std.pow(1.0 - fillZ, 2.1) * 0.2;
      const fillSmoked = fillBlur.rgb
        .mul(d.vec3f(0.8, 0.82, 0.86))
        .add(d.vec3f(0.17, 0.18, 0.2));
      const fillDome = fillSmoked.sub(
        d.vec3f(0.05, 0.055, 0.065).mul(fillShade),
      );
      const fillHi = std.min(fillStreak + fillSpec + fillInner * 0.1, 0.44);
      const fillGlassRgb = std.mix(
        fillDome,
        d.vec3f(0.97, 0.98, 1.0),
        fillHi * fillMask,
      );
      const fillMix = fillMask * 0.88;

      const thumbBtnUv = d.vec2f(thumbX, 1.0 - scrubCenterY);
      const thumbOff = sampleUv.sub(thumbBtnUv);
      const thumbZoom = 1.0 + 1.35 * std.max(0.0, 1.0 - thumbR) * thumbMask;
      const thumbGlassUv = thumbBtnUv.add(thumbOff.div(thumbZoom));
      const thumbVideoUv = thumbGlassUv
        .sub(coverHalf)
        .div(coverScale)
        .add(coverHalf);
      const thumbTap = 0.0024;
      const thumbS0 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        thumbVideoUv,
      );
      const thumbS1 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        thumbVideoUv.add(d.vec2f(thumbTap, 0.0)),
      );
      const thumbS2 = std.textureSampleBaseClampToEdge(
        videoEffectLayout.$.video,
        videoEffectLayout.$.sampler,
        thumbVideoUv.sub(d.vec2f(thumbTap, 0.0)),
      );
      const thumbBlur = thumbS0.mul(0.4).add(thumbS1.add(thumbS2).mul(0.3));
      const thumbZ = std.sqrt(std.max(0.0, 1.0 - thumbR2));
      const thumbSmoked = thumbBlur.rgb
        .mul(d.vec3f(0.66, 0.68, 0.72))
        .add(d.vec3f(0.2, 0.21, 0.23));
      const thumbMatte = std.mix(
        thumbSmoked,
        d.vec3f(0.9, 0.91, 0.94),
        thumbZ * 0.38 * thumbMask,
      );
      const thumbEdge = std.smoothstep(0.006, 0.0, thumbDist) * 0.08;
      const thumbGlassRgb = std.mix(
        thumbMatte.sub(d.vec3f(0.03, 0.035, 0.04)),
        d.vec3f(0.96, 0.97, 0.99),
        thumbEdge * thumbMask,
      );
      const thumbMix = thumbMask * 0.94;
      const scrubContact =
        std.smoothstep(0.012, 0.002, scrubDist) * (1.0 - scrubMask) * 0.06;
      const scrubShadowP = scrubP.sub(d.vec2f(0.0, -0.008));
      const scrubShadowAbs = d.vec2f(
        std.abs(scrubShadowP.x),
        std.abs(scrubShadowP.y),
      );
      const scrubShadowQ = scrubShadowAbs
        .sub(scrubExt)
        .add(d.vec2f(scrubCorner, scrubCorner));
      const scrubShadowDist =
        std.length(std.max(scrubShadowQ, d.vec2f(0.0, 0.0))) +
        std.min(std.max(scrubShadowQ.x, scrubShadowQ.y), 0.0) -
        scrubCorner;
      const scrubSoft =
        (1.0 - std.smoothstep(-0.012, 0.028, scrubShadowDist)) *
        (1.0 - scrubMask) *
        0.034;
      const thumbContact =
        std.smoothstep(0.014, 0.002, thumbDist) * (1.0 - thumbMask) * 0.07;
      const thumbSoftP = thumbP.sub(d.vec2f(0.0, -0.009));
      const thumbSoftDist = std.length(thumbSoftP) - thumbRadius * 1.06;
      const thumbSoft =
        (1.0 - std.smoothstep(-0.012, 0.032, thumbSoftDist)) *
        (1.0 - thumbMask) *
        0.04;
      const scrubDrop =
        (scrubContact + scrubSoft + thumbContact + thumbSoft) * shadowScale;

      // --- composite scene + UI overlays ---
      const totalShadow = std.min(
        playDrop + fx0Drop + fx1Drop + fx2Drop + fx3Drop + scrubDrop,
        0.14,
      );
      const shadowed = std.mix(
        baseColor.rgb,
        baseColor.rgb.mul(d.vec3f(0.82, 0.86, 0.9)),
        totalShadow,
      );

      const withFx0 = std.mix(shadowed, fx0GlassRgb, fx0Mix);
      const withFx1 = std.mix(withFx0, fx1GlassRgb, fx1Mix);
      const withFx2 = std.mix(withFx1, fx2GlassRgb, fx2Mix);
      const withFx3 = std.mix(withFx2, fx3GlassRgb, fx3Mix);
      const withScrubTrack = std.mix(withFx3, scrubTrackRgb, scrubTrackMix);
      const withScrubFill = std.mix(withScrubTrack, fillGlassRgb, fillMix);
      const withThumb = std.mix(withScrubFill, thumbGlassRgb, thumbMix);
      const scene = std.mix(withThumb, playGlassRgb, playMix);

      return d.vec4f(scene, 1.0);
    },
  });
}
