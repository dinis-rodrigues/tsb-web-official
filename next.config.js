const path = require('path')
const withImages = require('next-images')
module.exports = withImages({
        webpack: (config, { isServer }) => {
          if (isServer) {
            config.module.rules.push({
              test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
              use: {
                  loader: 'url-loader',
                  options: {
                      limit: 100000,
                      name: '[name].[ext]'
                  }
              }
          })
          }
          return config
        },
        cssLoaderOptions: {
          url: false
        }
      })
