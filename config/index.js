'use strict'
const path = require('path')

// const versiony = require('versiony')

// 获取版本
// var v = versiony.from('version.json').get();
// console.log(`当前版本号：${v}`);


module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable: {
    //   '/api': {
    //     target: 'http://172.19.119.128:8082',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '/'
    //     }
    //   },
    //   '/task': {
    //     target: 'http://172.19.119.128:8085',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/task': '/'
    //     }
    //   },
    //   '/guess': {
    //     target: 'http://172.19.119.128:18087',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/guess': '/'
    //     }
    //   },
    //   '/push': {
    //     target: 'http://172.19.119.128:8080',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/push': '/'
    //     }
    //   },
    //   '/bz28': {
    //     target: 'http://172.19.119.128:18087',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/bz28': '/'
    //     }
    //   },
    //   '/wish': {
    //     target: 'http://172.19.119.128:8091',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/wish': '/'
    //     }
    //   },
    //   '/excl': {
    //     target: 'http://172.19.119.128:8088',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       // '^/excl': '/'
    //     },
    //   }
    // },

    host: '0.0.0.0',
    port: 8080,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,

    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),

    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
