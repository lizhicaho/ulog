<template>
	<div>
		<view class="indexzong">
			<view >
				<cu-custom bgColor="bg-gradual-pink" v-bind:isBack="true">
					<view slot="backText">返回</view>
					
				</cu-custom>
			</view>
			<view class="index">
				
				<block v-for="(list, index) in lists" :key="index">
					<view class="row">
						<view class="card card-list2" v-for="(item,key) in list"  :key="key">
							<image class="card-img card-list2-img" @tap="gotoshow(item.type)" :src="item.img_src"></image>
							<text class="card-num-view card-list2-num-view">免费</text>
							<view class="card-bottm row">
								<view class="car-title-view row">
									<text class="card-title card-list2-title">{{item.title}}</text>
								</view>
								<view @click.stop="share(item)" class="card-share-view"></view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				refreshing: false,
				lists: [
					[{
						img_src: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1054718494,1599848286&fm=26&gp=0.jpg",
						type: 0,
						title: "应届生标准简历"
					},{
						img_src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605024614111&di=4856ba7d38ab68b3364c7c393ed8d151&imgtype=0&src=http%3A%2F%2Fimg.yanj.cn%2Feditor%2F20150627161104_91208.png",
						type: 1,
						title: "技术类简洁简历"
					}],
					[{
						img_src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605024743765&di=b7fdee4c09341cbd17a1c46e07c10680&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F09%2F11%2F2057d5519fc6514.jpg%2521%2Ffwfh%2F804x1137%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue",
						type: 2,
						title: "互联网风格简历"
					},{
						img_src: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3292940046,2357125731&fm=26&gp=0.jpg",
						type: 3,
						title: "通用简洁版简历"
					}],
					[{
						img_src: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3723206553,1670527756&fm=26&gp=0.jpg",
						type: 4,
						title: "英文版简历"
					}]
					],
				fetchPageNum: 1
			}
		},
		onLoad() {
			uni.getProvider({
				service: "share",
				success: (e) => {
					let data = [];
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log("获取登录通道失败", e);
				}
			});
		},
		
		methods: {
			
			
			gotoshow(type){
				//console.log(type) 
				uni.navigateTo({
					url: '/pages/shop/templeshow?id=' + type,
					animationType:"slide-in-left", // 跳转动画
					animationDuration: 800
						   })
			},
			share(e) {
				if (this.providerList.length === 0) {
					uni.showModal({
						title: "当前环境无分享渠道!",
						showCancel: false
					})
					return;
				}
				let itemList = this.providerList.map(function (value) {
					return value.name
				})
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ? 'WXSenceTimeline' : "WXSceneSession",
							type: 0,
							title:"uni-app模版",
							summary: e.title,
							imageUrl:e.img_src,
							href:"https://uniapp.dcloud.io",
							success: (res) => {
								console.log("success:" + JSON.stringify(res));
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel:false
								})
							}
						});
					}
				})
			}
		}
	}
</script>

<style>
	view {
	    display: flex;
	}
	
	page {
	    display: flex;
	    min-height: 100%;
	    background-color: #EFEFEF;
	}
	
	template {
	    display: flex;
	    flex: 1;
	}
</style>
