const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./app/ui/index.html",
  filename: "index.html"
});

module.exports = {
  entry: path.join(__dirname, "app/ui", "index.js"),
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.pack.js"
  },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    modules: [path.resolve(__dirname, "app"), "node_modules"]
  },
  devServer: {
    contentBase: path.join(__dirname, "app/ui")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: ["file-loader"]
      }
    ]
  },
  plugins: [htmlPlugin]
};
