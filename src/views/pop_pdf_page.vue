<template>
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
		name: 'pop_pdf_page',
		props: {
			pdfSrc: {
				type: String,
				default: 'http://81.70.245.235/test.pdf',
				/*default: 'http://portfolio.project-135.ithanhua.cn/resource/home/pdf/pdf_example.pdf',*/
			}
		},
		data() {
			return {
				currentPage: 0, // pdf文件页码
				pageCount: 0, // pdf文件总页数
				fileType: 'pdf', // 文件类型
				isLoading: false,
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
			pdf,
			Loading,
		},
		setup() {},
		computed: {

		},
		methods: {

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
	/*.pdfPage{
		width: 100%;
		margin: 0 auto;
		height:100vh;
	}*/
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

	.pdf-box {
		padding: 10px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 100%;
		margin: 0 auto;
		overflow-x: hidden;
		height: calc(95vh - 30px);
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		font-size: .28rem;

		
	}
	.pdf-box > span {
		width: 100%;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
</style>
