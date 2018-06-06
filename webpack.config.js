const path = require('path');

const bundle = {
  entry: './js/ngui.js',
  output: {
    path: path.resolve(__dirname, 'dist/js/include'),
    filename: 'ngui.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env', 'babel-preset-stage-1'],
          },
        },
      },
    ],
  },
};

const nguiinit = {
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js',
    library: 'NgUiInit',
    libraryTarget: 'umd',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env', 'babel-preset-stage-1'],
          },
        },
      },
    ],
  },
};

module.exports = [nguiinit, bundle];
