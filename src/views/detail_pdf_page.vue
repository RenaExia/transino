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

	<div class="pdfPage">
		<div v-if="isLoading" class="mask">
			<loading size="24px" vertical>加载中...</loading>
		</div>
		<!-- <v-touch style="height: calc(100% - 25px);" tag="div" @swipeleft="onSwipeLeft" @swiperight="onSwipeRight"> -->
		<div class="pdf-box" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
			<pdf ref="pdf" :src="pdfSrc" :page="currentPage" @num-pages="pageCount=$event" @page-loaded="pageLoaded"
				@loaded="loadPdfHandler" />
		</div>
		<!-- </v-touch> -->
		<!--页码-->
		<div v-show="fileType === 'pdf'" class="pdf">
			<van-row type="flex" justify="space-between">
				<!--<van-col span="12" style="text-align:center">
					<div class="touch">
						<van-button round size="mini" type="primary" :class="{select:idx==0}" @touchstart="idx=0"
							@touchend="idx=-1" @click="scaleD">
							放大
						</van-button>
						<van-button round size="mini" type="primary" :disabled="scale===100?true:false"
							:class="{select:idx==1}" @touchstart="idx=1" @touchend="idx=-1" @click="scaleX">
							缩小

						</van-button>
					</div>
				</van-col>-->
				<van-col span="24" style="text-align:center">
					<div class="pagesize">
						<!--上一页-->
						<van-button round size="mini" type="info" class="turn" :disabled="currentPage==1?true:false"
							:class="{grey: currentPage==1}" @click="changePdfPage(0)">上页</van-button>
						{{ currentPage }} / {{ pageCount }}
						<!--下一页-->
						<van-button round size="mini" type="info" class="turn"
							:disabled="currentPage==pageCount?true:false" :class="{grey: currentPage==pageCount}"
							@click="changePdfPage(1)">下页</van-button>
					</div>
				</van-col>
			</van-row>
		</div>
	</div>
	<!--  
	<div style="height:calc(100% - 46px)">
		<pdf-page v-if="flag" :pdf-src="pdfSrc" />
	</div>
-->
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
				currentPage: 0, // pdf文件页码
				pageCount: 0, // pdf文件总页数
				fileType: 'pdf', // 文件类型
				isLoading: true,
				scale: 100, // 放大系数
				idx: -1,
				touchDistance: 0,
				previousPinchScale: 1,
				startTime: 0,
				startX: null,
				startY: null,
				moveX: null,
				moveY: null,
				eLen: 0,
				
			}
		},
		watch: {},
		created() {},
		mounted() {
			this.loadPdfHandler();
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
				console.log(url);
				var loadingTask = pdf.createLoadingTask(url)
				loadingTask.promise.then(pdf => {
					this.url = loadingTask
					this.numPages = pdf.numPages
					this.pageCount = this.numPages
					
				}).catch((err) => {
					console.log(err)
				})
			},


			// 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
			changePdfPage(val) {
				console.log(val)
				if (val === 0 && this.currentPage > 1) {
					this.currentPage--
					// console.log(this.currentPage)
				}
				if (val === 1 && this.currentPage < this.pageCount) {
					this.currentPage++
					// console.log(this.currentPage)
				}
			},
			// 放大
			scaleD() {
				this.scale += 5
				this.$refs.pdf.$el.style.width = parseInt(this.scale) + '%'
			},

			// 缩小
			scaleX() {
				if (this.scale === 100) {
					return
				}
				this.scale += -5
				this.$refs.pdf.$el.style.width = parseInt(this.scale) + '%'
			},
			// 等pdf页数加载完成的时候，隐藏加载框
			pageLoaded(num) {
				console.log(num)
				if (num == this.currentPage) {
					this.isLoading = false
				}
			},
			// pdf加载时
			loadPdfHandler() {
				this.currentPage = 1 // 加载的时候先加载第一页
			},
			_getDistance(xLen, yLen) {
				return Math.sqrt(xLen * xLen + yLen * yLen)
			},
			touchstart(e) {
				this.startTime = this._getTime()
				this.startX = e.touches[0].pageX
				this.startY = e.touches[0].pageY
				if (e.touches.length > 1) {
					const point1 = e.touches[0]
					const point2 = e.touches[1]
					const xLen = Math.abs(point2.pageX - point1.pageX)
					const yLen = Math.abs(point2.pageY - point1.pageY)
					this.touchDistance = this._getDistance(xLen, yLen)
				}
			},
			touchmove(e) {
				this.moveX = e.touches[0].pageX
				this.moveY = e.touches[0].pageY
				// e.touches.length为手指的个数
				this.eLen = e.touches.length
				if (e.touches.length > 1) {
					const xLen = Math.abs(e.touches[0].pageX - e.touches[1].pageX)
					const yLen = Math.abs(e.touches[0].pageY - e.touches[1].pageY)
					const touchDistance = this._getDistance(xLen, yLen)
					if (this.touchDistance) {
						const pinchScale = touchDistance / this.touchDistance
						this.previousPinchScale = pinchScale
					}
				}
			},
			_getTime() {
				return new Date().getTime()
			},
			touchend(e) {
				console.log(e);
				// const timestamp = this._getTime()
				if (this.scale === 100 && this.eLen === 1) {
					if (this.moveX !== null && this.moveX - this.startX > 30) {
						if (this.currentPage !== 1) {
							this.changePdfPage(0)
						}
					} else if (this.moveX !== null && this.moveX - this.startX < -30) {
						if (this.currentPage < this.pageCount) {
							this.changePdfPage(1)
						}
					}
				}
				// alert(this.eLen)
				// if (this.moveX !== null && Math.abs(this.moveX - this.startX) > 5 ||
				// this.moveY !== null && Math.abs(this.moveY - this.startY) > 5) {
				//   if (this.eLen >= 2) { // 手指移动的位移要大于10像素并且手指和屏幕的接触时间要短于500毫秒
				//     // alert('双指')
				//     alert(this.previousPinchScale)
				//     // this._renderPage(1, this.previousPinchScale)
				//     this.$refs.pdf.$el.style.width = parseInt(this.previousPinchScale * this.scale) + '%'
				//     this.scale = this.scale * this.previousPinchScale
				//     this.eLen = 0
				//   }
				// }
			},
			/*onSwipeLeft() {
				debugger
			},
			onSwipeRight() {
				debugger
			}*/

		}
	}
</script>
<style scoped="scoped">
	.mask {
		width: 100vw;
		height: 100vh;
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

	.pdf-box {
		padding: 10px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 100%;
		margin: 0 auto;
		overflow-x: hidden;
		height: 100vh;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		font-size: .28rem;
	}
	
	.pdf-box span {
		width: 100%;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
</style>
