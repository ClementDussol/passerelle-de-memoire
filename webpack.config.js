module.exports = {
  entry: {
    main: "./src/main.js",
    cloud: "./src/cloud.js"
  },
  output: {
  	path: __dirname + "/dist/",
  	publicPath: __dirname + '/dist/',
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
     {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env'] 
        }
      }
    ]
  },
  resolve: {
   	extensions: ['.js'],
    alias: {
      vue: './../dist/vue.js'
    }
  }
}