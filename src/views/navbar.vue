<template>
	<van-nav-bar class="nav_bar_height" :title="navbar_title" />
</template>
<script>
	export default {
		/*metaInfo: {
			meta: [{
					charset: 'utf-8'
				},
				{
					content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2,user-scalable=yes'
				}
			]
		},*/
		name: 'navbar',
		props: {
				navbar_title: String
		},
		data() {
			return {

			}
		},
		components: {

		},
		setup() {
		
		},
		computed: {

		},
		methods: {

		}
	}
</script>
<style scoped="scoped">

</style>
