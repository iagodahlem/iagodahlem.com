import path from 'path'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'

export default {
  entry: {
    main: './src/main.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'js'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
}
