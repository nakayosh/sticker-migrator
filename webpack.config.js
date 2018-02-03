require('dotenv').config();
const webpack = require('webpack');
const path    = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {

  stats: isProd ? 'normal' : { errorDetails: true },

  devtool: !isProd && 'source-map' || '',

  entry: {
    main: './resources/smigrator/main.js',
    style: './resources/styles/main.scss',
  },

  output: {
    filename: isProd ? '[name]-[chunkhash].js' : '[name].js',
    chunkFilename: isProd ? '[name]-[chunkhash].js' : '[name].js',
    path: path.resolve(__dirname, 'public', 'packs'),
    publicPath: '/packs/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: isProd,
                sourceMap: !isProd,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProd,
              },
            },
          ],
        }),
      },
      {
        test: /\.(jpe?g|png|gif|ttf|otf|eot|svg|woff(2)?)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: isProd ? '[name]-[hash].[ext]' : '[name].[ext]',
            publicPath: '/packs/',
          },
        }],
      },
    ],
  },

  resolve: {
    extensions: ['.js'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PUSHER_APP_ID: JSON.stringify(process.env.PUSHER_APP_ID),
        PUSHER_APP_KEY: JSON.stringify(process.env.PUSHER_APP_KEY),
        PUSHER_APP_CLUSTER: JSON.stringify(process.env.PUSHER_APP_CLUSTER),
      },
    }),

    new ExtractTextPlugin({
      filename: isProd ? '[name]-[contenthash].css' : '[name].css',
      allChunks: true,
      publicPath: '/packs/',
    }),

    new ManifestPlugin({
      fileName: 'mix-manifest.json',
      basePath: '/',
      writeToFileEmit: true,
    }),
  ],

};

if ( isProd ) {
  module.exports.plugins.push([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true,
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ]);
}
