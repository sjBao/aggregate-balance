const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const federationConfig = require("./federation.config");

module.exports = {
    mode: 'development',
    devServer: {
        port: 8082
    },
    output: {
        publicPath: "http://localhost:8082/",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),

        new ModuleFederationPlugin({
            ...federationConfig,
            filename: "remoteEntry.js",
            shared: {
                react: {
                    singleton: true
                },
                "react-dom": {
                    singleton: true
                }
            }
        })
    ]
}
