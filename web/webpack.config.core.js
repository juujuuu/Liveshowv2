const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isProduction = process.env.NODE_ENV == "production";

const config = {
	output: {
		filename: "bundle.js",
	},
	module: {
		//What to use. Object for each filetype
		rules: [
			{
				test: /\.(js|jsx)$/i,
				resolve: {
					fullySpecified: false,
				},
				exclude: /node_modules/, //don't use this loader on node_modules
				loader: "babel-loader",
				options: {
					presets: [
						[
							"@babel/preset-env",
							{
								targets: "defaults",
							},
						],
						"@babel/preset-react",
					],
				},
			},						
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
};

module.exports = (appName) => {
	console.log(appName);

	if (isProduction) {
		config.mode = "production";
	} else {
		config.mode = "development";
	}

	let outputPath;
	if (config.mode === "production") {
		outputPath = "dist";
		config.optimization = {
			minimize: true,
			minimizer: [new TerserPlugin()],
		};
		config.plugins = [];
		config.plugins[0] = new CleanWebpackPlugin();
		config.plugins[1] = new MiniCssExtractPlugin();
		config.module.rules[1].use = [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
	} else {
		outputPath = "src";
	}
	config.entry = `./js/react/src/${appName}/src/index.js`;
	config.output.path = path.resolve(__dirname, `js/react/${outputPath}/${appName}`);
	config.module.rules[0].include = [
		path.resolve(__dirname, `js/react/src/${appName}/src`),
		path.resolve(__dirname, "js/react/src/common_components"),
	];

	return config;
};
