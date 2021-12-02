module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
	/*devServer: {
		proxy: {
			'/api': {
				target: 'http://portfolio.project-135.ithanhua.cn',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},*/
	/*
	outputDir: "magazin_dist",*/
	/*devServer: {
		proxy: 'http://portfolio.project-135.ithanhua.cn',
	},*/
}
