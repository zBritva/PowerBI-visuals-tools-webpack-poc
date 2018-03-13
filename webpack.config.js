const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const PowerBICustomVisualsWebpackPlugin = require('powerbi-customvisuals-webpack-plugin');
const WatchIgnorePlugin = require("webpack").WatchIgnorePlugin;
const iconImage = ""; //TODO fix it
const encoding = "utf8";

//TODO get from pbiviz json
const stringResourcesPath = path.join("stringResources", "en-US", "resources.json");
const capabilitiesPath = "./capabilities.json";
const pbivizPath = "./pbiviz.json";
const pbivizFile = require(path.join(__dirname,pbivizPath));

module.exports = {
    entry: './src/external.ts',
    devtool: 'source-map',
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        path: path.join(__dirname, "/.tmp/drop"),
        publicPath: 'assets',
        filename: "visual.js",
        libraryTarget: 'var',
        library: 'CustomVisual'
    },
    devServer: {
        // logLevel: "SILENT",
        disableHostCheck: true,
        contentBase: path.join(__dirname, ".tmp/drop"),
        compress: true,
        port: 8080,
        hot: false,
        inline: false,
        https: {
            key: path.join(__dirname, "certs","PowerBICustomVisualTest_public.key"),
            cert: path.join(__dirname, "certs", "PowerBICustomVisualTest_public.cer"),
            pfx: path.join(__dirname, "certs", "PowerBICustomVisualTest_public.pfx"),
        },
        headers: {
            "access-control-allow-origin": "*",
            "cache-control": "public, max-age=0"
        },
    },
    plugins: [
        new PowerBICustomVisualsWebpackPlugin({
            ...pbivizFile,
            devMode: true
        }),
        // tool generates plugin, and it's leads to recursively reloading
        new WatchIgnorePlugin([
            path.join(__dirname, "src", "visualPlugin.js"),
        ]),
    ]
};