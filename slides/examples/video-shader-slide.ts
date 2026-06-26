fragment: ({ uv }) => {
  "use gpu";

  const source = std.textureSampleBaseClampToEdge(
    layout.$.video,
    layout.$.sampler,
    videoUv,
  );

  const warm = source.rgb.mul(d.vec3f(1.08, 0.98, 0.92));
  const vignette = 1.0 - std.length(uv.sub(coverHalf)) * 0.85;
  const graded = d.vec4f(warm, source.a).mul(vignette);

  const fxOn = std.mod(std.floor(params.effectMask), 2.0);
  const color = std.mix(source, graded, fxOn);

  return d.vec4f(color.rgb, 1.0);
},
