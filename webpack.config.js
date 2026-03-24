const path = require("path");

module.exports = {
  mode: "production",
  // devtool: "eval-source-map",
  entry: "./components/kia-app/index.js",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    module: true
  },

  experiments: {
    outputModule: true
  },

  devServer: {
  static: {
    directory: path.resolve(__dirname, "dist")
  },

  port: 3000,
  open: true,

  hot: false,          // ❌ no HMR (required for ESM)
  liveReload: false,   // ❌ client disabled anyway

  client: false,       // 🔥 critical: no injected runtime

  devMiddleware: {
    writeToDisk: true  // ✅ emit rebuilt files to dist/
  },

  watchFiles: [
    "components/**/*",
    "index.html"
  ]
}
,

  module: {
    rules: [
      {
        test: /\.js$/,
        type: "javascript/esm"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              exportType: "string"
            }
          }
        ]
      }
    ]
  },

  stats: {
    // errorDetails: true
  },
};
