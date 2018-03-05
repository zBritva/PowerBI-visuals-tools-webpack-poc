const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const PowerbiCustomVisualsWebpackPlugin = require('./plugins/pbiCustomVisualPlugin');
const WatchIgnorePlugin = require("webpack").WatchIgnorePlugin;
const iconImage = ""; //TODO fix it
const encoding = "utf8";

//TODO get from pbiviz json
const stringResourcesPath = path.join("stringResources", "en-US", "resources.json");
const capabilitiesPath = "./capabilities.json";
const pbivizPath = "./pbiviz.json";
const pbivizFile = require(pbivizPath);

module.exports = {
    entry: './src/visual.ts',
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
        path: path.join(__dirname, "/build"),
        publicPath: 'assets',
        filename: "visual.js",
        libraryTarget: 'var',
        library: 'CustomVisual'
    },
    devServer: {
        // logLevel: "SILENT",
        disableHostCheck: true,
        contentBase: path.join(__dirname, "build"),
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
        new PowerbiCustomVisualsWebpackPlugin({
            visual: {
                name: pbivizFile.visual.name,
                displayName: pbivizFile.visual.displayName,
                guid: pbivizFile.visual.guid,
                visualClassName: pbivizFile.visual.visualClassName,
                version: pbivizFile.visual.version,
                description: pbivizFile.visual.description,
                supportUrl: pbivizFile.visual.supportUrl,
                author: pbivizFile.visual.author
            },
            apiVersion: pbivizFile.apiVersion,
            style: "style/visual.less",
            stringResources: [
                require("./" + stringResourcesPath)
            ],
            capabilities: require(capabilitiesPath)
        }),
        // tool generates plugin, and it's leads to recursively reloading
        new WatchIgnorePlugin([
            path.join(__dirname, "src", "visualPlugin.js"),
        ]),
    ]
};