const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/dist/plugin").default;
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  // mode: "production",
  entry: { main: "./src/js/main.js", lp: "./src/sass/lp.scss" },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "resolve-url-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'wp-content/themes/19studio/_g3/assets/images/lp/image/[name][ext]'
        }
        // wp/wp-content/themes/19studio/_g3/assets/images/lp/image/bg_lp6.png
      }
    ],
  },
  resolve: {
    alias: {
      "@global": path.resolve(__dirname, "src/sass/global"),
      "@image": path.resolve(__dirname, "src/image"),
    },
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: "./src/index.html",
    // }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true, // オプションAPIを有効にする場合
      __VUE_PROD_DEVTOOLS__: false, // Vue Devtoolsのサポートを無効にする場合
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/image", to: "images/lp/image" },
        // { from: "src/sass/wp.css", to: "css" }
      ],
    }),
    new CompressionPlugin({
      filename: '[path][base].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.svg$|\.woff(\?.*)?$/,
      threshold: 10240,
      minRatio: 0.8,
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "wp/wp-content/themes/19studio/_g3/assets"),
    },
    compress: true,
    port: 8080,
    hot: false,
    liveReload: true,
  },
  output: {
    path: path.resolve(__dirname, "wp/wp-content/themes/19studio/_g3/assets"),
    filename: "js/lp/[name].js",
    publicPath: "/",
  },
  devtool: "source-map",
  cache: false,
};
