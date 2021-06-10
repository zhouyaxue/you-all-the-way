// 查看占用空间
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
// 打包开启gzip
const CompressionPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import '@/assets/styles/variable.scss';
        @import '@/assets/styles/mixins.scss';
        `
      },
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 192, // 换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            // selectorBlackList: [], //要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: true, // （布尔值）允许在媒体查询中转换px。
            minPixelValue: 2 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
          })
        ]
      }
    }
  },
  runtimeCompiler: true,
  productionSourceMap: process.env.NODE_ENV !== 'production', // 去除.map文件
  publicPath: './', // 设置打包后的静态文件相对index.html路径
  assetsDir: 'static', // 跟换打包后的静态资源文件夹名称
  outputDir: 'asiaInfo_base_bj_qmpcs_web', // 打包后的文件名称
  // assetsDir 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  // indexPath 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  devServer: {
    host: process.env.Host || '0.0.0.0',
    https: false,
    open: true, // 自启动
    port: 9001,
    proxy: {
      '/asiaInfo_base_bj_ps_service': {
        target: 'https://172.30.232.21:9007',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/asiaInfo_base_bj_ps_service': '/asiaInfo_base_bj_ps_service'
        }
      }
    }
  },
  chainWebpack: (config) => {
    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(WebpackBundleAnalyzer.BundleAnalyzerPlugin);
    }
    config
      .plugin('CompressionPlugin')
      .use(CompressionPlugin, []);
  }
}
  ;
