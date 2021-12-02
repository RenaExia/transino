<template>
	<!--<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<detail msg="现在这个是detail" />
	</div>-->
	<navbar :navbar_title="navbar_title"></navbar>
	<van-tabs v-model:active="active" class="my_van_tabs" animated>
		<van-tab title="大连" name="3" class="my_tab">
			<van-tree-select v-model:main-active-index="activeIndex" height="90vh" :items="items">
				<template #content>
					<van-grid clickable :gutter="8"  :column-num="3">
						<van-grid-item v-for="value in 8" :key="value" icon-prefix="vant-icon-size" to="/detail"
							icon="https://img.yzcdn.cn/vant/apple-2.jpg" text="文字1" />
					</van-grid>
					<van-grid clickable :gutter="8"  :column-num="3">
						<van-grid-item v-for="value in 8" :key="value" icon-prefix="vant-icon-size" to="/detail"
							icon="https://img.yzcdn.cn/vant/apple-1.jpg" text="文字2" />
					</van-grid>
					<van-grid clickable :gutter="8"  :column-num="3">
						<van-grid-item v-for="value in 16" :key="value" icon-prefix="vant-icon-size" to="/detail"
							icon="https://img.yzcdn.cn/vant/apple-1.jpg" text="文字3" />
					</van-grid>
				</template>
			</van-tree-select>
		</van-tab>
		<van-tab title="广州" name="d" class="my_tab">
			<van-tree-select v-model:main-active-index="activeIndex" height="90vh" :items="items">
				<template #content>
					<van-grid clickable :gutter="8"  :column-num="3">
						<van-grid-item v-for="value in 8" :key="value" icon-prefix="vant-icon-size" to="/detail"
							icon="https://img.yzcdn.cn/vant/apple-2.jpg" text="文字1" />
					</van-grid>
					<van-grid clickable :gutter="8"  :column-num="3">
						<van-grid-item v-for="value in 8" :key="value" icon-prefix="vant-icon-size" to="/detail"
							icon="https://img.yzcdn.cn/vant/apple-1.jpg" text="文字2" />
					</van-grid>
					<van-grid clickable :gutter="8"  :column-num="3">
						<van-grid-item v-for="value in 16" :key="value" icon-prefix="vant-icon-size" to="/detail"
							icon="https://img.yzcdn.cn/vant/apple-1.jpg" text="文字3" />
					</van-grid>
				</template>
			</van-tree-select>
		</van-tab>
		<van-tab title="北京" name="2" class="my_tab">
			<van-empty image="error" description="网络错误" />
		</van-tab>
	</van-tabs>
</template>


<script>
	import {
		ref
	} from 'vue';
	import navbar from './navbar';
	const app_data = {
		news_list: [{
				title: "11111",
				num: 11111
			},
			{
				title: "11112",
				num: 222223
			},
			{
				title: "111122",
				num: 221224
			},
			{
				title: "444444",
				num: 22222
			},
			{
				title: "11111",
				num: 22222
			},
			{
				title: "11111",
				num: 22222
			},
			{
				title: "11111",
				num: 22222
			},
			{
				title: "11111",
				num: 22222
			},
		],
		items: [{
			text: '2021年1月'
		}, {
			text: '2021年2月'
		}, {
			text: '2021年3月'
		}],
		navbar_title: "首页"
	};

	export default {
		name: 'App',
		data() {
			return app_data
		},
		setup() {
			const activeIndex = ref(0);
			const navbar_title = app_data.navbar_title;
			return {
				activeIndex,
				items: app_data.items,
				navbar_title
			};
		},
		computed: {
			toall: {
				get() {
					let all_toall = 0;
					let arry = this.news_list;
					for (let i = 0; i < arry.length; i++) {
						all_toall += arry[i].num;
					}
					return all_toall;
					/*return this.news_list.reduce((s, n) => s + n.num, 0);*/
				}
			},
			message: {
				get() {
					return this.mss1 + ' ' + this.mss2 + ' ' + this.mss3;
				}
			}
		},
		components: {
			navbar: navbar
		},
	
		methods: {
			_this_tiem() {
				this.$router.push({
					path: '/detail',

				})
			}
			/*add() {
				if(this.num_value >= this.max_value){
					this.num_value = this.max_value;
					this.num_message="最大值为"+this.max_value;
				}else{
					this.num_message="";
					this.num_value++;
				}
				
			},
			sub() {
				if(this.num_value <= this.min_value){
					this.num_value = this.min_value;
					this.num_message="最小值为"+this.min_value;
				}else{
					this.num_message="";
					this.num_value--;
				}
				
			}*/

		},

	}
</script>
<style scoped="scoped">
	.van-nav-bar__content {
		height: 5vh;
	}

	.van-tabs__wrap {
		height: 5vh !important;
	}

	.van-tree-select__nav {
		flex: 0.7 !important;
	}

	.my_tab {
		text-align: center;
		display: block;
	}

	.van-tab {
		flex: inherit !important;
		padding: 0 10px !important;
	}

	.vant-icon-size>img {
		width: 2em;
		height: 2em;
	}
	.my_van_tabs{
		height: 95vh;
		overflow: hidden;
	}
</style>
