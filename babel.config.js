module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "~app": "./src/app",
            "~app-root": "./src/app-root",
            "~screens": "./src/screens",
            "~features": "./src/features",
            "~shared": "./src/shared",
            "react-native-wgpu": "react-native-webgpu",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      "unplugin-typegpu/babel",
      "react-native-reanimated/plugin",
    ],
  };
};
