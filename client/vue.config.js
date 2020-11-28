const path = require('path')
module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001'
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(png|jpg|svg)$/,
          include: path.join(__dirname, 'img'),
          loader: 'url-loader?limit=30000&name=images/[name].[ext]'
          //   use: [
          //     {
          //       loader: 'url-loader',
          //       options: {
          //         name: 'files/[name].[hash:8].[ext]'
          //       }
          //     }
          //   ]
        }
      ]
    }
  }
}
