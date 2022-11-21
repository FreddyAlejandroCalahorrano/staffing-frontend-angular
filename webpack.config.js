const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: process.env.endpoint || "http://localhost:4201/",
    uniqueName: "mfapp",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfapp",
      library: { type: "var", name: "mfapp" },
      filename: "remoteEntry.js",
      exposes: {
        MFModule:
          "src/app/mf.module",
      },
      shared: {
        "@angular/core": { eager: true, singleton: true, requiredVersion: '~12.2.0' },
        "@angular/common": { eager: true, singleton: true, requiredVersion: '~12.2.0' },
        "@angular/router": { eager: true, singleton: true, requiredVersion: '~12.2.0' }
      },
    }),
  ],
};
