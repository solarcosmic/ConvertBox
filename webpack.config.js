import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default {
  mode: "development",
  entry: {
    background: "./src/background.js",
    images: "./src/images.js",
    markdown: "./src/markdown.js",
    qrcode: "./src/qrcode.js",
    hex_rgb: "./src/hex_rgb.js",
    styles: "./src/styles.js",
    snack: "./src/snack.js"
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "[name].js"
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "manifest.json", to: "." },
        { from: "icons", to: "icons"}
      ]
    })
  ],
  devtool: "cheap-module-source-map"
};