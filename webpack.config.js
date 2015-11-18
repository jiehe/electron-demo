

module.exports = {
  entry: './app/jsx/index.js',
  output: {
    path: './app/js/',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {test: /\.(less|css)$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
      {test: /\.(png|jpg)$/ ,exclude: /(node_modules|bower_components)/, loader: 'url-loader?limit=8192'}, // inline base64 URLs for <=8k images, direct URLs for the rest,
      {test: /\.js$/, loader: 'babel'}
    ]
  }
}