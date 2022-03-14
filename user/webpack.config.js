"use strict";
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./main.jsx",
  },
  mode: "development",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /(\.m?js$|\.m?jsx$)/,
        exclude: /(node_modules|export)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, "export"),
    filename: "client.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./main.html",
      filename: "./main.html",
    }),
  ],
};
