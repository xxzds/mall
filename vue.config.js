module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                'assets':'@/assets',
                'common':'@/common',
                'views':'@/views',
                'components':'@/components',
                'network':'@/network',
            }

        }
    },
  devServer: {
    proxy: 'http://47.98.118.137'
  }

}
