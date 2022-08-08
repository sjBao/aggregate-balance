const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
	mode: 'development',
	devServer: {
		port: 8081
	},

    module: {
        rules: [
            {
                test: /\.csv$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: "raw-loader"
                  }
                ],
              }
        ]
    },

	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),

        new ModuleFederationPlugin({
            name: "dv01_api",
            filename: "remoteEntry.js",
            exposes: {
                "./loan-data": "./src/bootstrap.js"
            }
        })
	]
}
