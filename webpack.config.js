const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/script/app.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },

  mode: "development",
};
