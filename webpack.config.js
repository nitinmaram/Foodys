const webpack = require('webpack');
const path = require('path');

const config = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-hot-middleware/client?http://localhost:3000/',
		path.join(__dirname, "webclient", "clientapp.jsx")
	],
	output: {
		path: path.resolve(__dirname, 'webclient', 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	node: {
      	child_process: 'empty',
      	fs: "empty",
      	net: "empty",
      	tls: "empty"
    },
  devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.(jsx|js)$/,
				loader: ['react-hot-loader', 'babel-loader'],

				exclude: [/node_modules/]
			},
			{
			  test: /\.css$/,
			  loader: 'style-loader!css-loader'
			},
			{
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            }
		]
	}
}

module.exports = config;
