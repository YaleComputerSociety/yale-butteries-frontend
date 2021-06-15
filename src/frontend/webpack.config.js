const path = require('path');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
              },
              importLoaders: 2,
            },
          },
          // apply postcss plugins
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-import',
                  'autoprefixer',
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env', 
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                ],
              },
            },
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsConfigPathsPlugin({})],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
