<template>
	<navbar :navbar_title="navbar_title"></navbar>
	<van-swipe :autoplay="3000" :height="250">
		<van-swipe-item class="my_swiper" @click="swiper_image_preview(i)" v-for="vant_images in vant_images"
			:key="vant_images">
			<img :src="vant_images" style="max-width:100%" />
		</van-swipe-item>
	</van-swipe>

	<div class="detail_title">{{detail_title}}</div>

	<van-row gutter="20" class="detail_van_row">
		<van-col span="12"><img :src='swiper_images[0]' style="max-width:100%"></van-col>
		<van-col span="12">
			<div class="detail_van_row_content_title">
				2016-09-01
			</div>
			<div class="detail_van_row_content_btn" @click="showPopup">
				views
			</div>
		</van-col>
	</van-row>
	<div class="detail_title" style="margin-top: 25px;">预览</div>
	<swiper :slides-per-view="3" :space-between="15" @swiper="onSwiper" @slideChange="onSlideChange">
		<swiper-slide v-for="(item,i) in swiper_images" :key="item" @click="swiper_image_preview(i)"
			style="border: 1px solid #000;"><img :src="item" style="max-width: 100%;" /></swiper-slide>
	</swiper>

	<div class="detail_title" style="margin-top: 25px;">过去的杂志</div>
	<van-grid :border="false" :column-num="3" class="detail_other_list">
		<van-grid-item>
			<van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
			<div class="detail_van_row_list_title">
				2016-09-01
			</div>
		</van-grid-item>
		<van-grid-item>
			<van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
			<div class="detail_van_row_list_title">
				2016-09-01
			</div>
		</van-grid-item>
		<van-grid-item>
			<van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
			<div class="detail_van_row_list_title">
				2016-09-01
			</div>
		</van-grid-item>
		<van-grid-item>
			<van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
			<div class="detail_van_row_list_title">
				2016-09-01
			</div>
		</van-grid-item>
		<van-grid-item>
			<van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
			<div class="detail_van_row_list_title">
				2016-09-01
			</div>
		</van-grid-item>
		<van-grid-item>
			<van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
			<div class="detail_van_row_list_title">
				2016-09-01 2016-09-01 2016-09-01
			</div>
		</van-grid-item>
		<van-grid-item>
			<van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
			<div class="detail_van_row_list_title">
				2016-09-01
			</div>
		</van-grid-item>
		<van-grid-item>
			<van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
			<div class="detail_van_row_list_title">
				2016-09-01
			</div>
		</van-grid-item>
		<van-grid-item>
			<van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
			<div class="detail_van_row_list_title">
				2016-09-01 2016-09-01 2016-09-01
			</div>
		</van-grid-item>
	</van-grid>





	<van-popup v-model:show="show" closeable
		style=" width: 100vw; height: 100vh; padding-top: 5vh; box-sizing: border-box;">
		<pdf_page></pdf_page>
	</van-popup>
</template>

<script>
	import {
		Swiper,
		SwiperSlide
	} from 'swiper/vue';
	import pdf_page from './pop_pdf_page';
	import 'swiper/swiper.min.css';
	import navbar from './navbar';
	import {
		ImagePreview
	} from 'vant';
	import {
		ref
	} from 'vue';

	const vant_images = [
		'https://img.yzcdn.cn/vant/apple-1.jpg',
		'https://img.yzcdn.cn/vant/apple-2.jpg',
		'https://img.yzcdn.cn/vant/apple-1.jpg',
		'https://img.yzcdn.cn/vant/apple-2.jpg',
		'https://img.yzcdn.cn/vant/apple-1.jpg',
	];
	const swiper_images = [
		'https://img.yzcdn.cn/vant/apple-2.jpg',
		'https://img.yzcdn.cn/vant/apple-1.jpg',
		'https://img.yzcdn.cn/vant/apple-2.jpg',
		'https://img.yzcdn.cn/vant/apple-1.jpg',
		'https://img.yzcdn.cn/vant/apple-2.jpg',
		'https://img.yzcdn.cn/vant/apple-1.jpg',
		'https://img.yzcdn.cn/vant/apple-2.jpg',
	];
	const app_data = {
		detail_title: "杂志标题",
        navbar_title: "详细页"
	};

	/*const pdf_url = require("@/assets/pdf/pdf_example.pdf");*/
	export default {
		name: 'detail',

		data() {
			return {
				app_data,
			}
		},
		components: {
			Swiper,
			SwiperSlide,
			pdf_page: pdf_page,
			navbar:navbar
		},
		setup() {
			const show = ref(false);
			const showPopup = () => {
				show.value = true;
			};
			const navbar_title = app_data.navbar_title;
			const onSwiper = (swiper) => {
				console.log(swiper);
			};
			const onSlideChange = () => {
				console.log('slide change');
			};
			return {
				vant_images,
				onSwiper,
				onSlideChange,
				swiper_images,
				show,
				showPopup,
				navbar_title
			};
		},
		computed: {

		},
		methods: {
			swiper_image_preview(index) {
				console.log(index);
				ImagePreview({
					images: swiper_images,
					startPosition: index,
					closeable: true,
				});
			},
		}
	}
</script>
<style scoped="scoped">
	.detail_title {
		display: block;
		font-size: 20px;
		color: #000000;
		padding: 10px 15px;
		border-bottom: 1px solid #C8C9CC;
		margin-bottom: 15px;
	}

	.detail_van_row {
		padding: 15px 15px;
		border-bottom: 1px solid #C8C9CC;
		margin-bottom: 25px;
	}

	.detail_van_row_content_title {
		display: block;
		font-size: 16px;
		color: #4A4A4A;
	}

	.detail_van_row_list_title {
		display: block;
		font-size: 16px;
		color: #4A4A4A;
		padding: 10px;
	}

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.block {
		width: 120px;
		height: 120px;
		background-color: #fff;
	}

	.detail_other_list {
		margin-top: 30px;
	}

	.detail_van_row_content_btn {
		float: right;
		padding: 15px;
		font-size: 16px;
		color: #4A4A4A;
		margin-top: 50px;
		border: 1px solid #000000;
	}

	.mask {
		width: 100vw;
		height: 100%;
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
	}

	.mask .van-loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}


</style>
