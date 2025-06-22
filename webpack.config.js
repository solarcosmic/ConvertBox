import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default {
  mode: "development",
  entry: {
    background: "./src/background.js",
    content: "./src/content.js"
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