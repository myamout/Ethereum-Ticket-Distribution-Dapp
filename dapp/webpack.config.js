module.exports = {
  entry: ['babel-polyfill', './src/main'],
  output: {
    path: __dirname + '/dist/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-2']
      }
    },{
      test: /\.scss?$/,
      loader: 'style-loader!css-loader!sass-loader'
    }]
  },
};