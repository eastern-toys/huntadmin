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
      DEBUG: true
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8081
  }
}
