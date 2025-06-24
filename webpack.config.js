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
    snack: "./src/snack.js",
    modal: "./src/modal.js"
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "[name].js"
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "manifest.json", to: "." },
        { from: "icons", to: "icons"},
        { from: "src/assets/Inter.ttf", to: "src/assets/Inter.ttf"},
        { from: "src/modal/ConvertBox.png", to: "src/modal/ConvertBox.png"},
      ]
    })
  ],
  devtool: "cheap-module-source-map"
};