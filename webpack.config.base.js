const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const port = 8080

const publicPath = `http://localhost:${port}/`

const buildPath = path.resolve(__dirname,"./build/render")

const mode = process.env.NODE_ENV === "production" ? "production" : "development"

const isDev = mode === "development"

const target = "electron-renderer"

const devtool = isDev ? "inline-source-map" : "source-map"

const entry = path.resolve(__dirname, "src/render/index.js")

const output = {
    filename: "bundle_[hash].js",
    path: buildPath,
}

if (isDev) {
    output.publicPath = publicPath
}

const csslessLoader = () => {
    return [
        {
            loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader
        },
        {
            loader: "css-loader",
            options: {
                sourceMap: true,
                modules: {
                    localIdentName: "[name]__[local]--[hash:base64:5]",
                    auto: /\.module\.\w+$/i
                }
            }
        },
        {
            loader: "postcss-loader",
            options: {
                sourceMap: true,
                postcssOptions: {
                    plugins: [
                        require('autoprefixer')
                    ]
                }
            }
        },
        {
            loader: "resolve-url-loader",
            options: {
                sourceMap: true
            }
        },
        {
            loader: "sass-loader",
            options: {
                sourceMap: true
            }
        }
    ]
}

const cssModule = {
    test: /\.(s[ac]|c)ss$/i,
    exclude: /node_modules/,
    use: csslessLoader()
}

const lessModule = {
    test: /\.less$/i,
    exclude: /node_moudles/,
    use: csslessLoader()
}

lessModule.use = [...lessModule.use,
    (
        {
            loader: "less-loader",
            options: {
                sourceMap: true
            }
        }
    )
]

const scriptModule = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
        {
            loader: "babel-loader",
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-react",
                ],
                plugins: [
                    "@babel/plugin-transform-runtime"
                ]
            }
        }
    ]
}

const modules = {
    rules: [
        scriptModule,
        cssModule,
        lessModule
    ]
}

const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/render/index.html"),
        inject: "body"
    }),
    !isDev ? new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    })
        : false,
].filter(Boolean)

const resolve = {
    extensions: [".js", ".jsx", ".json"]
}

const devServer = {
    static: {
        directory: path.join(__dirname, 'public'),
        publicPath: publicPath
    },
    port: port,
    hot: true,
    compress: true,
    historyApiFallback: true
}

const config = {
    mode: mode,
    devtool: devtool,
    entry: entry,
    output: output,
    module: modules,
    plugins: plugins,
    resolve: resolve
}

if (isDev) {
    config["devServer"] = devServer
}

module.exports = config
