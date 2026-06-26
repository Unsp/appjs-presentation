import type { TgpuRoot } from "typegpu";
import tgpu, { common, d, std } from "typegpu";

const layout = tgpu.bindGroupLayout({
  params: {
    uniform: d.struct({
      time: d.f32,
      effectMask: d.f32,
      canvasAspect: d.f32,
      videoAspect: d.f32,
    }),
  },
  video: { externalTexture: d.textureExternal() },
  sampler: { sampler: "filtering" },
});

export function createVideoSlideShader(root: TgpuRoot) {
  return root.createRenderPipeline({
    vertex: common.fullScreenTriangle,
    fragment: ({ uv }) => {
      "use gpu";

      const params = layout.$.params;
      const coverHalf = d.vec2f(0.5, 0.5);
      const coverScale = d.vec2f(
        std.max(1.0, params.videoAspect / params.canvasAspect),
        std.max(1.0, params.canvasAspect / params.videoAspect),
      );
      const videoUv = d.vec2f(uv).sub(coverHalf).div(coverScale).add(coverHalf);

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
  });
}
