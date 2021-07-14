const path = require("path");
const projectRootDir = path.resolve(__dirname);

module.exports = {
  stories: ["../src/**/*.stories.js"],
  // Add any Storybook addons you want here: https://storybook.js.org/addons/
  addons: [],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../")
    });

    config.module.rules.push({
      test: /\.(js|jsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false }]]
      }
    });
    config.resolve.extensions.push(".js", ".jsx");
    config.resolve = {
      extensions: ['.js', '.scss', '.html'],
      modules: [
        path.resolve(__dirname, '../'),
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../utils'),
        // path.resolve(__dirname, '../src/static'),
        // path.resolve(__dirname, '../src/Components'),
        path.resolve(__dirname, '../node_modules'),
      ]
    };

    return config;
  }
};
