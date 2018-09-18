module.exports = {
  css: {
    loaderOptions: {
      postcss: {
          // options here will be passed to postcss-loader
          // plugins: [require('postcss-px2rem')({
          //     remUnit: 75,
          //     baseDpr: 1,
          // })]
      }
    }
  },
  devServer: {
    disableHostCheck: true
  }
}