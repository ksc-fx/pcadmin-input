const path = require('path');

var cssLoader = {
    loader: 'css-loader',
    options: {
        minimize: false,
        sourceMap: true
    }
};

function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader];
    if (loader) {
        loaders.push({
            loader: loader + '-loader',
            options: Object.assign({}, loaderOptions, {
                sourceMap: true
            })
        });
    }
    return ['vue-style-loader'].concat(loaders);
}

module.exports = {
    entry: {
        // 项目的入口文件
        app: ['./demo/index.js']
    },
    output: {
        path: path.resolve(__dirname, './demo'),
        publicPath: '/demo/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, ''),
        openPage: 'demo/index.html',
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.js$/,
                exclude: [new RegExp(`node_modules\\${path.sep}(?!pcadmin-.*)`)],
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: generateLoaders(),
                        less: generateLoaders('less')
                    },
                    transformToRequire: {
                        video: 'src',
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    }
};
