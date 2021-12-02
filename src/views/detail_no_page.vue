<template>
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
			<div class="detail_van_row_content_btn">
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

	<div class="pdfNoPage">
		<div v-if="isLoading" class="mask">
			<loading size="24px" vertical>加载中...</loading>
		</div>
		<div class="pdf-box">
			<pdf v-for="i in numPages" :key="i" :src="pdfSrc" :page="i" @page-loaded="pageLoaded" />
		</div>
	</div>

</template>

<script>
	import pdf from 'vue3-pdf'
	import {
		Loading
	} from 'vant'

	import {
		Swiper,
		SwiperSlide
	} from 'swiper/vue';

	import 'swiper/swiper.min.css';
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
	};

	/*const pdf_url = require("@/assets/pdf/pdf_example.pdf");*/
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

		name: 'detail',

		props: {

			pdfSrc: {
				type: String,
				
				default: 'http://81.70.245.235/test.pdf',
				/*default: 'http://portfolio.project-135.ithanhua.cn/resource/home/pdf/pdf_example.pdf',*/
			}
		},
		data() {
			return {
				app_data,
				numPages: undefined,
				isLoading: true,
			}
		},
		watch: {},
		created() {},
		mounted() {
			this.getNumPages(this.pdfSrc)
		},
		components: {
			Swiper,
			SwiperSlide,
			pdf,
			Loading,
			[ImagePreview.Component.name]: ImagePreview.Component,
		},
		setup() {
			const show = ref(false);
			const showPopup = () => {
				show.value = true;
			};
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
			getNumPages(url) {
				var loadingTask = pdf.createLoadingTask(url)
				loadingTask.promise.then(pdf => {
					this.url = loadingTask
					this.numPages = pdf.numPages
					console.log(pdf.numPages);
				}).catch((err) => {
					console.log(err)
				})
			},
			// 等pdf页数加载完成的时候，隐藏加载框
			pageLoaded(num) {
				if (num === this.numPages) {
					this.isLoading = false
				}
			}

			/*xiazai() {
				const downloadTask = uni.downloadFile({
					url: 'http://img.netbian.com/file/2019/0414/7bee7eef5fc44417a0b02a46576e7e16.jpg', //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功');
						}
						let that = this;
						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success: function(red) {
								that.luj = red.savedFilePath
								console.log(red)
							}
						});
					}
				});

				downloadTask.onProgressUpdate((res) => {
					console.log('下载进度' + res.progress);
					console.log('已经下载的数据长度' + res.totalBytesWritten);
					console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				});
			}*/
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
	}

	.mask .van-loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.pdf-box {
		padding: 10px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		max-width: 1024px;
		width: 100%;
		margin: 0 auto;
		overflow-x: hidden;
		height: 100%;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		font-size: .28rem;

		span {
			width: 100%;
		}
	}
</style>
