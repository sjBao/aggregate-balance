const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const WebpackRemoteTypesPlugin = require("webpack-remote-types-plugin").default;



const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:8080/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8080,
    historyApiFallback: true,
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
      },
      {
        test: /\.csv$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "raw-loader"
          }
        ],
      }
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        dv01_api: "dv01_api@http://localhost:8081/remoteEntry.js",
        dv01_solar: "dv01_solar@http://localhost:8082/remoteEntry.js",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new WebpackRemoteTypesPlugin({
      remotes: {
        dv01_solar: "dv01_solar@http://localhost:8082/remoteEntry.js",
      },
      outputDir: 'types',
      remoteFileName: '[name]-dts.tgz'
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
  ],
};
