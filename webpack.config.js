require('es6-promise').polyfill();
var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var ProvidePlugin = webpack.ProvidePlugin;
//var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    devtool: 'source-map',
    debug: true, // set false in production
    cache: true,

    entry: {
        'vendor': './src/vendor.ts', // third party dependencies
        'app': './src/app/main.ts' // our app
    },

    output: {
        path: root('__build__'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js',
        pathinfo: true,
        devtoolModuleFilenameTemplate: function(info) {
        return "file:///"+info.absoluteResourcePath;
    }
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.html']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                query: {
                    'ignoreDiagnostics': [
                        2403, // 2403 -> Subsequent variable declarations
                        2300, // 2300 -> Duplicate identifier
                        2374, // 2374 -> Duplicate number index signature
                        2375  // 2375 -> Duplicate string index signature
                    ]
                },
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },

            // Support for *.json files.
            {test: /\.json$/, loader: 'json-loader'},

            // support for .css
            {test: /\.css$/, loaders: ['style', 'css']},

             {
                test: /\.(eot|com|json|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            }
        ],
        noParse: [/angular2-polyfills/]
    },

    plugins: [
        new CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity}),
        new CommonsChunkPlugin({name: 'common', filename: 'common.js', minChunks: 2, chunks: ['app', 'vendor']}),
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Cookies: "js-cookie"
        })
//        new UglifyJsPlugin() // use for production
    ],
    
    
    // Other module loader config
    tslint: {
        emitErrors: true,
        failOnHint: false
    },
    // our Webpack Development Server config
    devServer: {
        contentBase: 'src',
        publicPath: '/__build__',
        colors: true,
        progress: true,
        port: 3000,
	host: '0.0.0.0',
        displayCached: true,
        displayErrorDetails: true,
        inline: true},
        

     headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token"
    }

};


// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}
