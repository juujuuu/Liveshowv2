const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//TODO FIX THE SASS, HANDLEBAR INJECTION?

let config = {
    devServer: {
        compress: false,
        devMiddleware: {
            writeToDisk: true,
        },
        historyApiFallback: {
            index: "index.html",
        },
        static: {
            directory: path.resolve(__dirname, `js/react/src/exhibman_v2/public/`),
        },
    },
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
                    plugins: ["@babel/plugin-transform-runtime"],
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
                type: "asset/resource",
            },
        ],
    },
};

module.exports = (appName) => {
    console.log(appName);
    config.mode = process.env.NODE_ENV;

    config.entry = `./js/react/src/${appName}/src/index.js`;

    const outPath = path.resolve(__dirname, `js/react/src/${appName}/public/`);

    config.output.path = outPath;

    config.output.publicPath = outPath;

    if (appName === "confman" || appName === "checklist") {
        config.devServer.static.directory = path.resolve(__dirname, `js/react/src/${appName}/public/`);
    }

    config.module.rules[0].include = [path.resolve(__dirname, `js/react/src/${appName}/src`), path.resolve(__dirname, "js/react/src/common_components")];

    return config;
};
