const Path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    router: Path.resolve(__dirname, "../src/scripts/router/router.js"),
    styleTransfer: Path.resolve(
      __dirname,
      "../src/scripts/style-transfer/styleTransfer.js"
    ),
    domManipulation: Path.resolve(
      __dirname,
      "../src/scripts/dom-manipulation/domManipulation.js"
    ),
    imageClassifier: Path.resolve(
      __dirname,
      "../src/scripts/image-classifier/imageClassifier.js"
    )
  },
  output: {
    path: Path.join(__dirname, "../build"),
    filename: "js/[name].js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, "../public"), to: "public" }
    ]),
    new HtmlWebpackPlugin({
      hash: true,
      template: Path.resolve(__dirname, "../src/index.html"),
      templateParameters: {
        title: "Image Style Transfer Demo"
      },
      chunks: ["router"],
      filename: "index.html"
    })
  ],
  resolve: {
    alias: {
      "~": Path.resolve(__dirname, "../src")
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader"
        }
      }
    ]
  }
};
