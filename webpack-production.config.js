var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: /src/,
      loader: 'babel'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      CUBE_API_SERVER: '\'http://localhost:8182\'',
      EVENTS_SERVER: '\'ws://192.168.1.2:8002\'',
      DEBUG: false,
      'process.env.NODE_ENV': '\'production\''
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  }
}
