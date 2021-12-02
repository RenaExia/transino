<template>
	<van-nav-bar class="nav_bar_height" title="首页" />
</template>
<script>
	export default {
		metaInfo: {
			meta: [{
					charset: 'utf-8'
				},
				{
					name: 'viewport',
					content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2,user-scalable=yes'
				}
			]
		},
		
		name: 'navbar',

		props: {
			pdfSrc: {
				type: String,
				default: 'http://81.70.245.235/test.pdf',
				/*default: 'http://portfolio.project-135.ithanhua.cn/resource/home/pdf/pdf_example.pdf',*/
			}
		},
		data() {
			return {
				
			}
		},
		components: {

		},
		setup() {},
		computed: {

		},
		methods: {

		}
	}
</script>
<style scoped="scoped">

</style>
