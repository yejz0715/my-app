const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
module.exports = merge(config, {
    mode: "development",
    devtool: "eval",
    devServer: {
        host: "localhost",
        historyApiFallback: true,
        port: 3000,
        // hot: true,
        // open: true,
    },
});
