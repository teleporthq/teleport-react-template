const { merge } = require("webpack-merge");
const { resolve, join, relative } = require("path");
const TerserPlugin = require('terser-webpack-plugin')
const commonConfig = require("./common");
const CopyPlugin  = require('copy-webpack-plugin')


module.exports = env => merge(commonConfig(env), {
  mode: "production",
  entry: resolve(__dirname, '../src/index.tsx'),
  output: {
    filename: "js/bundle.[contenthash].min.js",
    path: resolve(__dirname, "../build"),
    publicPath: "/",
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  plugins: [
    new TerserPlugin({ terserOptions: {keep_fnames: true, keep_classnames: true, }}),
    new CopyPlugin({
      patterns: [
        {
          from: '../public/playground_assets',
          to() {
            return join(__dirname, '../build', 'playground_assets');
          },
        },
      ]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  }
});
