const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: path.join(__dirname, "src", "index.tsx"),
	output: {
		path: path.join(__dirname, "build"),
		filename: "bundle.js",
		publicPath: '/'
  	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
			},
			{
				test: /.(css|scss)$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			},
			{
				test: /.(jpg|jpeg|png|gif|mp3|svg)$/,
				use: [
				{
					loader: "file-loader",
					options: {
					name: "[path][name]-[hash:8].[ext]"
					}
				}
				]
			}
		]
	},
	resolve:
			{
				extensions: ['.tsx', '.ts', '.js'],
			},
	devServer: {
			contentBase: __dirname + '/dist'
	},
	plugins: [
		new HtmlWebpackPlugin({
		filename: "index.html",
		template: path.join(__dirname, "src", "index.html")
		}),
		new MiniCssExtractPlugin({
		filename: "[name].css",
		chunkFilename: "[id].css"
		})
	]
};