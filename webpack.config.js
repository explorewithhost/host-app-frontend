// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      { test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {filename: "images/[name][hash][ext]"},
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new webpack.DefinePlugin({
      "process.env.API_BASE": JSON.stringify(process.env.API_BASE || "")
    }),
  ],
  devServer: {
    static: "./dist",
    historyApiFallback: true,
    // port: 3000, // uncomment if you want 3000 locally
  },
  mode: "development",
};
