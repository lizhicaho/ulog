<template>
	<div>
	<cu-custom bgColor="bg-gradual-pink" v-bind:isBack="true">
		<view slot="backText">返回</view>		
	</cu-custom>
	<view class="index">
		<swiper @change="swpierChange" :style="{height:screenHeight + 'px',width:screenWidth + 'px'}">
			<swiper-item v-for="(value,index) in data" :key="index" @click="preImg(index)">
				<image  :src="value.imgurl" mode="widthFix"></image>
			</swiper-item>
		</swiper>
	    <!-- #ifndef H5 -->
	    <view class="detail-btn-view">
	    	<view class="download" @click="download"></view>
	    	<!-- #ifdef APP-PLUS -->
	    	<view v-if="showBtn" class="setting" @click="setting">下载模板</view>
	    	<!-- #endif -->
	    	<view class="collect" @click="collect"></view>
	    </view>
	    <!-- #endif -->
	</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					 "username": "",
					  "fileurl": "",
					  "imgurl": "",
					  "openid": "",
					  "time": "",
					  "type":0 ,
					  "types":-1 ,
				},
				imgShow: false,
				index: 0,
				showBtn: false,
				screenHeight: 0,
				imgLength: 0,
				providerList: [],
				data: [],
				detailDec:""
			}
		},		
		onLoad: function (options) {		      		      
			  this.form.types=parseInt(options.id)
			  
			  this.userlogin()
		  // #ifdef APP-PLUS
		  		if (plus.os.name === 'Android') {
		  			this.showBtn = true;
		  		}
		  		// #endif
		  		this.screenHeight = uni.getSystemInfoSync().windowHeight;
				this.screenWidth = uni.getSystemInfoSync().windowWidth
				//console.log(uni.getSystemInfoSync().windowHeight)
				//console.log(uni.getSystemInfoSync().windowWidth)
		  		//this.detailDec = e.data;
		  		//let data = JSON.parse(decodeURIComponent(e.data));
		  		//console.log(this.data)
		  		//this.data.push(data.img_src);
		  		//this.getData(data.id);
		  		 uni.setNavigationBarTitle({
		  		 	title: "1/" + this.imgLength
		  		 });
		  		// 获取分享通道
		  		uni.getProvider({
		  			service: "share",
		  			success: (e) => {
		  				let data = []
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
		  	onShareAppMessage() {
		  		return {
		  			title: "欢迎使用uni-app看图模板",
		  			path: '/pages/shop/templeshow?data=' + this.form.types,
		  			imageUrl:this.data[this.index]
		  		}
		  	},
		  	onNavigationBarButtonTap(e) {
		          if(e.index === 1){
		              this.collect();
		              return;
		          }
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
		  					scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
		  						'WXSenceTimeline' : "WXSceneSession",
		  					type: 0,
		  					title: "uni-app模版",
		  					summary: "欢迎使用uni-app模版",
		  					imageUrl: this.data[this.index],
		  					href: "https://uniapp.dcloud.io",
		  					success: (res) => {
		  						console.log("success:" + JSON.stringify(res));
		  					},
		  					fail: (e) => {
		  						uni.showModal({
		  							content: e.errMsg,
		  							showCancel: false
		  						})
		  					}
		  				});
		  			}
		  		})
		  	},
		  	methods: {
				async userlogin(){
					console.log("init:初始化数据")
					console.log(this.form)
					let res = await uniCloud.callFunction({
						name: 'temples',
						data: Object.assign({}, this.form, {type: 'get'})
					})
					console.log(res)
					if (res.result.code === 0) {
						this.$toast('加载成功')
						//this.form=res.result.msg
						this.form=res.result.msg.data
						this.data=res.result.msg.data
						this.imgLength = this.data.length;
						
						//console.log(res.result.msg.data)
						//console.log(this.data[0].imgurl)
					} else {
						
							uni.navigateTo({
							 url: '/pages/shop/shop' ,
							 animationType:"slide-in-left", // 跳转动画
							 animationDuration: 800
							})
						
					}	
				},
		  		download() {
		  			const downloadTask = uni.downloadFile({
		  				url: this.data[this.index].fileurl,
						
		  				success: (res) => {
		  									if (res.statusCode === 200) {
		  										console.log('下载成功');
		  									}
		  									
											let that = this;
															uni.saveFile({
																tempFilePath: res.tempFilePath,
																	success: function(red) {
																		that.luj = red.savedFilePath
																		  uni.openDocument({
																		              filePath: red.savedFilePath,
																		              success: function (res) {
																		                console.log('打开文档成功')
																		              },
																		            });
																		
																		uni.showToast({
																			icon: "none",
																			title: "已下载到手机"
																		})
																	},
																	fail: () => {
																		uni.showToast({
																			icon: "none",
																			title: "下载到手机失败"
																		})
																	}
																});
		  							
							
		  					// uni.saveImageToPhotosAlbum({
		  					// 	filePath: e.tempFilePath,
		  					// 	success: () => {
		  					// 		uni.showToast({
		  					// 			icon: "none",
		  					// 			title: "已保存到手机相册"
		  					// 		})
		  					// 	},
		  					// 	fail: () => {
		  					// 		uni.showToast({
		  					// 			icon: "none",
		  					// 			title: "保存到手机相册失败"
		  					// 		})
		  					// 	}
		  					// });
		  				},
		  				fail: (e) => {
		  					uni.showModal({
		  						content: "下载失败，" + e.errMsg,
		  						showCancel: false
		  					})
		  				},
					
		  			})
				
					downloadTask.onProgressUpdate((res) => {
								console.log('下载进度' + res.progress);
								console.log('已经下载的数据长度' + res.totalBytesWritten);
								console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
							});
		  		},
		  		collect() {
		  			uni.showToast({
		  				icon: "none",
		  				title: "点击收藏按钮"
		  			})
		  		},
		  		//#ifdef APP-PLUS
		  		setting() {
		  			uni.showToast({
		  				icon: "none",
		  				title: "正在设为壁纸"
		  			})
		  			setTimeout(() => {
		  				var WallpaperManager = plus.android.importClass("android.app.WallpaperManager");
		  				var Main = plus.android.runtimeMainActivity();
		  				var wallpaperManager = WallpaperManager.getInstance(Main);
		  				plus.android.importClass(wallpaperManager);
		  				var BitmapFactory = plus.android.importClass("android.graphics.BitmapFactory");
		  				uni.downloadFile({
		  					url: this.data[this.index],
		  					success: (e) => {
								
		  						var filePath = e.tempFilePath.replace("file://", "");
		  						var bitmap = BitmapFactory.decodeFile(filePath);
		  						try {
		  							wallpaperManager.setBitmap(bitmap);
		  							uni.showToast({
		  								icon: "none",
		  								title: "壁纸设置成功"
		  							})
		  						} catch (e) {
		  							uni.showToast({
		  								icon: "none",
		  								title: "壁纸设置失败"
		  							})
		  						}
		  					},
		  					fail: () => {
		  						uni.showToast({
		  							icon: "none",
		  							title: "壁纸设置失败"
		  						})
		  					}
		  				})
		  			}, 100)
		  		},
		  		//#endif
		  		swpierChange(e) {
		  			this.index = e.detail.current;
		  			uni.setNavigationBarTitle({
		  				title: e.detail.current + 1 + "/" + this.imgLength
		  			})
		  		},
		  		preImg(index) {
		  			if (this.imgShow) { //防止点击过快导致重复调用 
		  				return;
		  			}
		  			this.imgShow = true;
		  			setTimeout(() => {
		  				this.imgShow = false;
		  			}, 1000)
		  			setTimeout(() => {
		  				uni.previewImage({
		  					current: this.data[index],
		  					urls: this.data
		  				})
		  			}, 150)
		  		},
		  	
		  	}
		  }
</script>

<style>
	
	page,
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
	
	
	

	
	.detail-btn-view view text{
		margin-left: 10upx;
	}
	.detail-btn-view .download:before { 
		content: '\e617';
	}
	.detail-btn-view .collect:before { 
		content: '\e68d';
	}
	.detail-btn-view .setting {
		flex: 1;
	}
	
	
	swiper {
		flex: 1;
		width: 750upx;
		background-color: #000;
		display: flex;
		flex-direction: column;
	}
	
	swiper-item {
		display: flex;
		align-items: center;
	}
	
	image {
		width: 750upx;
		height: 1125upx;
	}
</style>
