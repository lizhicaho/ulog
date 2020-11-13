<template>
	<div>
		<view>
			<cu-custom :bgColor="'bg-'+themeColor.name" :isBack="true" :icon="'sort'">
				
				<block slot="content">{{lang.home_stories}}</block>
			</cu-custom> 				
		</view>
		<scroll-view scroll-y class="scrollPage">
		 
		  <view class="cu-card">
		    <view class="cu-item bg-img shadow-blur" v-bind:style="{backgroundImage:'url(' + item.img + ')'}"  @tap="toChild(item.url)"  v-for="(item,i) in list" wx:key>
		      <navigator url="">
				  <view class="cardTitle">
				    {{item.title}}
				  </view>
			  </navigator>
			 
		    </view>
		  </view>
		  <view class="cu-tabbar-height"></view>
		</scroll-view>
	</div>
	
</template>

<script>   
let pageStart = 0
let pageSize = 10

let testData = []

	import Tab from '@/colorui/components/tab/index'
	import Scroll from '@/colorui/components/scroll/index'
	export default {
		components:{
			Tab,Scroll
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				duration: 300, // swiper-item 切换过渡时间
				showPage: -1, // 控制列表空状态的显示时机
				categoryCur: 0,
				categoryMenu: [],
				categoryData: [],
				list: [{
				        title: '创建简历',
				        img: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
				        url: '/form/form'
				    },
				      {
				        title: '一键生成简历',
				        img: 'https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg',
				        url: '/templatez/templatez'
				      },
				      {
				        title: '简历商城',
				        img: 'https://image.weilanwl.com/color2.0/plugin/qpct2148.jpg',
				        url: '/shop/shop'
				      },
				      {
				        title: '面试提升',
				        img: 'https://image.weilanwl.com/color2.0/plugin/qpczdh2307.jpg',
				        url: '/question/question'
				      }
				    ]
			}
		},
		onLoad() {},
		
		methods: {									
			async getCategoryMenu() {
				try{
					// const res = await uniCloud.callFunction({
					// 	name: 'articleCategory',
					// 	data: {
					// 		type: 'get'
					// 	}
					// })
					const res = await this.$uniCloud('articleCategory', {type: 'get'})
					
					this.categoryMenu = res.result.data
					this.categoryData = this.categoryMenu.map(item => {
						return {
							name: item.name,
							requesting: false,
							end: false,
							emptyShow: false,
							page: pageStart,
							listData: []
						}
					})
					this.getList('refresh', pageStart)
				}catch(e){
					//TODO handle the exception
					
				}
			},

			async getList(type, currentPage = 1) {
				let pageData = this.getCurrentData()
		
				pageData.requesting = true
		
				this.setCurrentData(pageData)
				// 自定义导航栏没有这个，需要可以自己加
				// uni.showNavigationBarLoading()
				
				// 请求数据, 第0页开始 1-10条
				// let res = await uniCloud.callFunction({
				// 	name: "article",
				// 	data: {
				// 		categoryId: this.categoryMenu[this.categoryCur]._id,
				// 		currentPage,
				// 		pageSize
				// 	}
				// })
				let res = await this.$uniCloud('article', {
					categoryId: this.categoryMenu[this.categoryCur]._id,
					currentPage,
					pageSize
				})
				testData = res.result.list
				
				setTimeout(() => {
					pageData.requesting = false
		
					// uni.hideNavigationBarLoading()
		
					if (type === 'refresh') {
						pageData.listData = testData
						pageData.listCount = pageData.listData.length
						pageData.end = false //是否已经全部加载
						pageData.page = currentPage + 1
					} else if (testData.length === 10){
						pageData.listData = pageData.listData.concat(testData)
						pageData.listCount = pageData.listData.length
						pageData.end = false
						pageData.page = currentPage + 1
					} else if (testData.length >= 0 && testData.length < 10) {
						pageData.listData = pageData.listData.concat(testData)
						pageData.listCount = pageData.listData.length
						pageData.end = true
						// pageData.page = currentPage + 1
					}
		
					this.setCurrentData(pageData)
					if (pageData.listData.length === 0) {
						pageData.emptyShow = true
					}
				}, 100)
			},
			 toChild(e) {
				 
					 uni.navigateTo({
							   url: '/pages' + e,
							   animationType:"slide-in-left", // 跳转动画
							   animationDuration: 800
							  })
			   },
			intoPageDetail(item) {
				uni.navigateTo({
				 url: `/page-details/page-details?id=${item._id}` ,
				 animationType:"slide-in-left", // 跳转动画
				 animationDuration: 800
				})
			},
			// 顶部tab切换事件
			toggleCategory(e) {
				this.duration = 0
		
				setTimeout(() => {
					this.categoryCur = e.index
				}, 0)
			},
			// 页面滑动切换事件
			swipeChange(e) {
				this.duration = 300
				
				setTimeout(() => {
					this.categoryCur = e.detail.current
					
					this.loadData()
				}, 0)
			},
			// 更新页面数据
			setCurrentData(pageData) {
				this.categoryData[this.categoryCur] = pageData
			},
			// 获取当前激活页面的数据
			getCurrentData() {
				return this.categoryData[this.categoryCur]
			},
			// 判断是否为加载新的页面,如果是去加载数据
			loadData() {
				let pageData = this.getCurrentData()
				if (pageData.listData.length == 0) {
					this.getList('refresh', pageStart)
				}
			},
			// 刷新数据
			refresh() {
				this.getList('refresh', pageStart)
			},
			// 加载更多
			more() {
				this.getList('more', this.getCurrentData().page)
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/colorui/variables';
.top-wrap {
	position: fixed;
	left: 0;
	/* #ifdef H5 */
	top: var(--window-top);
	/* #endif */
	width: 100%;
	background-color: #ffffff;
	z-index: 99;
}

.cardTitle{
  color: #fff;
  padding: 90rpx 60rpx;
  font-size: 40rpx;
  font-weight: 300;
  transform: skew(-10deg, 0deg);
  position: relative;
  text-shadow: 0px 0px 6rpx rgba(0,0,0,0.3)
}

.cardTitle::before{
  content: "";
  position: absolute;
  width: 60rpx;
  height: 6rpx;
  border-radius: 20rpx;
  background-color: #fff;
  display: block;
  top: 60rpx;
  left: 50rpx;  
  transform: skew(10deg, 0deg);
}
.cardTitle::after{
  content: "";
  position: absolute;
  width: 140rpx;
  border-radius: 6rpx;
  height: 24rpx;
  background-color: #fff;
  display: block;
  bottom: 76rpx;
  left: 90rpx;  
  transform: skew(10deg, 0deg);
  opacity: 0.1;
}
.cells {
	background: #ffffff;
	margin-top: 20rpx;
}

.cell {
	display: flex;
	padding: 20rpx;

	&:not(:last-child) {
		border-bottom: 1rpx solid $lineColor;
	}

	&__hd {
		font-size: 0;

		image {
			width: 160rpx;
			height: 160rpx;
			margin-right: 20rpx;
			border-radius: 12rpx;
		}
	}

	&__bd {
		flex: 1;

		.name {
			@include line(2);
			font-size: 28rpx;
			margin-bottom: 12rpx;
		}

		.des {
			@include line(2);
			color: $mainBlack2;
			font-size: 24rpx;
		}
	}
}
</style>
