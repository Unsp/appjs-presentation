const path = require("path");

const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "react-native-wgpu": path.resolve(
    __dirname,
    "node_modules/react-native-webgpu",
  ),
};

module.exports = config;
