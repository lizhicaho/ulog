<template>
	<div>
		<cu-custom bgColor="bg-gradual-pink" v-bind:isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">简历</view>
		</cu-custom>
		<view class="vbox">
			
			
			<image class="top_back_img" src="../../static/images/person/set-top-bg_1.png" mode="aspectFit"></image>
			<view class="top">
				<view class="circle" @tap="showModal" data-target="myPhoto">
					<image class="head" :src="form.imageurlhead" mode="aspectFill"></image>
				</view>
				<view class="top-texts">
					<text class="name">{{form.username}}</text>
					<view class="other">
						<text>工作方向：</text>
						<text>JAVA开发</text>
					</view>
					<view class="other">
						<text>手机号：</text>
						<text>{{form.phone}}</text>
					</view>
				</view>
			</view>
		
			<view class="cu-modal" :class="modalName=='myPhoto'?'show':''">
				<view class="cu-dialog">
					<view class="bg-img" style="background-image: url(http://tvax2.sinaimg.cn/large/005Tv2WXgy1gggi0u3m0wj30680b2dg5.jpg);height: 400px;">
						<!-- <image src="../../static/person/you.jpg" mode="widthFix"></image> -->
						<view class="cu-bar justify-end text-white">
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		
			<!-- 中间部分 -->
			<view class="middle">
				<view class="middle-left">
					<image class="middle-icon" src="../../static/images/person/cust.png"></image>
					<text>年龄：</text>
					<text class="middle-num">{{form.age}}</text>
				</view>
				<view class="middle-line"></view>
				<view class="middle-right">
					<image class="middle-icon" src="../../static/images/person/loan.png"></image>
					<text>工作经验：</text>
					<text class="middle-num">{{form.epx}}</text>
				</view>
			</view>
		
			<view class="justify-between flex lign-center flex-twice" style="width: 100%;margin-top: -30px;">
		
				<view @tap="call" class="margin shadow-lg flex-sub " style="border-radius: 4px;">
					<button class="bg-gradual-blue cuIcon-weixinmargin text-white text-left">
						<text class="cuIcon-phone text-grey text-white">立即拨打电话</text>
					</button>
				</view>
		
				<view class="margin shadow-lg flex-sub " style="border-radius: 4px;">
					<button class="bg-gradual-blue cuIcon-weixinmargin text-white text-left" open-type="contact">
						<text class="cuIcon-weixin text-grey text-white">发起微信会话</text>
					</button>
				</view>
			</view>
		
			<scroll-view scroll-y class="page">
				<view class="margin bg-white shadow-lg shadow-warp shadow-blur" style="border-radius: 4px;">
					<view class="solid-bottom">
						<view class="cu-bar">
							<view class="action sub-title">
								<text class="text-xl text-bold text-blue">基本信息</text>
								<text class="text-ABC text-blue">Personal</text>
							</view>
						</view>
						<view class="flex flex-wrap justify-between">
							<view class="padding-xs">
								<view class="padding-xs text-xl text-bold">学历：{{form.learn}}</view>
								<view class="padding-xs text-xl text-bold">邮箱：{{form.email}}</view>
								<view class="padding-xs text-xl text-bold">性别：{{form.sex}}</view>
								<view class="padding-xs text-xl text-bold">意向岗位：{{form.work}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="margin bg-white shadow-lg shadow-warp shadow-blur" style="border-radius: 4px;">
					<view class="solid-bottom">
						<view class="cu-bar">
							<view class="action sub-title">
								<text class="text-xl text-bold text-blue">教育背景</text>
								<text class="text-ABC text-blue">Education</text>
							</view>
						</view>
						<view class="flex flex-wrap justify-between">
							<view class="padding-xs">
								<view class="padding-xs text-xl text-bold">{{form.study}}</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="margin bg-white shadow-lg shadow-warp shadow-blur" style="border-radius: 4px;">
					<view class="solid-bottom">
						<view class="cu-bar">
							<view class="action sub-title">
								<text class="text-xl text-bold text-blue">项目经历</text>
								<text class="text-ABC text-blue">ITEM</text>
							</view>
						</view>
						<view class="flex flex-wrap justify-between">
							<view class="padding-xs">
								<view class="padding-xs text-xl text-bold">{{form.item}}</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="margin bg-white shadow-lg shadow-warp shadow-blur" style="border-radius: 4px;">
					<view class="solid-bottom">
						<view class="cu-bar">
							<view class="action sub-title">
								<text class="text-xl text-bold text-blue">实习经历</text>
								<text class="text-ABC text-blue">Internship</text>
							</view>
						</view>
						<view class="flex flex-wrap justify-between">
							<view class="padding-xs">
								<view class="padding-xs text-xl text-bold">{{form.internship}}</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="margin bg-white shadow-lg shadow-warp shadow-blur" style="border-radius: 4px;">
					<view class="solid-bottom">
						<view class="cu-bar">
							<view class="action sub-title">
								<text class="text-xl text-bold text-blue">自我评价</text>
								<text class="text-ABC text-blue">Self</text>
							</view>
						</view>
						<view class="flex flex-wrap justify-between">
							<view class="padding-xs">
								<view class="padding-xs text-xl text-bold">{{form.self}}</view>
							</view>
						</view>
					</view>
				</view>
		
				<view class="margin bg-white shadow-lg shadow-warp shadow-blur" style="border-radius: 4px;">
					<view class="solid-bottom">
						<view class="cu-bar">
							<view class="action sub-title">
								<text class="text-xl text-bold text-blue">技能描述</text>
								<text class="text-ABC text-blue">Skill</text>
							</view>
						</view>
						<view class="flex flex-wrap justify-between">
							<view class="padding-xs">
								<view class="padding-xs text-xl text-bold">{{form.skill}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-tabbar-height"></view>
			</scroll-view>
		
		
		
		</view>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				form: {
					username: '',
					sex:'男',
					sex1:true,
					age:'',
					phone:'',
					email:'',
					learn:'',
					work:'',
					epx:'',
					modalName: null,
					study:'',
					textareaBValue:'',
					item:'',
					internship:'',
					self:'',
					skill:'',	
					openid:'null',
					imageurlhead:''
					}
			}
		},
		onLoad() {
		let _this=this
		const opid=uni.getStorage({
			key:'openid',
			success: function (res) {
			        console.log(res.data);
					_this.form.openid = res.data
					console.log(_this.form.openid);
					_this.userlogin()
			    }
				
		})
		  uni.showShareMenu({
		       menus: ['shareAppMessage', 'shareTimeline'],
		       success(res) {
		         console.log(res)
		       },
		       fail(e) {
		         console.log(e)
		       }
		     })

			
		},
		/**
		   * 用户点击右上角分享
		   */
		 onShareAppMessage: function( options ){
		   var that = this;
		   // 设置菜单中的转发按钮触发转发事件时的转发内容
		   var shareObj = {
		     title: "我的简历请查收",    // 默认是小程序的名称(可以写slogan等)
		     // path: '/pages/share/share',    // 默认是当前页面，必须是以‘/'开头的完整路径
		     imageUrl: '',   //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
		     success: function(res){
		       // 转发成功之后的回调
		       if(res.errMsg == 'shareAppMessage:ok'){
		       }
		     },
		     fail: function(){
		       // 转发失败之后的回调
		       if(res.errMsg == 'shareAppMessage:fail cancel'){
		         // 用户取消转发
		       }else if(res.errMsg == 'shareAppMessage:fail'){
		         // 转发失败，其中 detail message 为详细失败信息
		       }
		     },
		     complete(){
		       // 转发结束之后的回调（转发成不成功都会执行）
		     }
		   };
		   // 来自页面内的按钮的转发
		   if( options.from == 'button' ){
		     var eData = options.target.dataset;
		     console.log( eData.name );   // shareBtn
		     // 此处可以修改 shareObj 中的内容
		     shareObj.path = '/pages/btnname/btnname?btn_name='+eData.name;
		   }
		   // 返回shareObj
		   return shareObj;
		 },
		 onShareTimeline(){
		     
		   },

		methods: {
			
			async userlogin(){
				
				let res = await uniCloud.callFunction({
					name: 'user_self',
					data: Object.assign({}, this.form, {type: 'get'})
				})
				
				if (res.result.code === 0) {
					this.$toast('加载成功')
					//this.form=res.result.msg
					this.form=res.result.msg.data[0]
				
				} else {
					
						uni.navigateTo({
						 url: '/pages/form/form' ,
						 animationType:"slide-in-left", // 跳转动画
						 animationDuration: 800
						})
					
				}	
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: this.form.phone
				});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			// 跳转外部链接
			tonewurl(url) {
				console.info(url)
				if (url == null) {
					return false;
				}
				uni.navigateTo({
					url: '../webpage/webpage?url='+url
				});
			},
		}
	}
</script>

<style scoped>
	.index {
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: white;
		border-top: 1px solid #cccccc;
	}

	.vbox {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top_back_img {
		z-index: -1;
		position: absolute;
		top: 0upx;
		width: 100%;
		height: 420upx;

	}

	.top {
		display: flex;
		width: 100%;
		height: 420upx;
		align-items: center;
	}

	.circle {
		margin-left: 80upx;
		width: 240upx;
		height: 240upx;
		border: 10upx solid #a4f4f6;
		/* border-radius: 240upx; */
		overflow: hidden;
	}

	.head {
		width: 240upx;
		height: 240upx;
		/* border-radius: 240upx; */
	}

	.top-texts {
		display: flex;
		flex-direction: column;
		margin-left: 15upx;
		color: white;
	}

	.name {
		font-size: 48upx;
		font-weight: 500;
	}

	.other {
		font-size: 36upx;
		font-weight: 500;
	}

	.set-top-hr {
		width: 210upx;
		height: 6upx;
	}

	.top-changeInfo {
		margin-top: 250upx;
		width: 120upx;
		height: 28upx;
		line-height: 28upx;
		background-color: #FFFFFF;
		border-radius: 15upx;
		padding: 10upx;
		color: #33dce8;
	}

	.middle {
		display: flex;
		align-items: center;
		position: relative;
		top: -50upx;
		width: 80%;
		height: 100upx;
		background-color: white;
		border-radius: 15upx;
	}

	.middle-line {
		width: 2upx;
		height: 80upx;
		background-color: #eeeeee;
	}

	.middle-left {
		flex-grow: 1;
		color: #666666;
		display: flex;
		align-items: center;
		text-align: center;
	}

	.middle-right {
		flex-grow: 1;
		color: #666666;
		display: flex;
		align-items: center;
		text-align: center;
	}

	.middle-icon {
		width: 40upx;
		height: 40upx;
		margin-left: 20upx;
	}

	.middle-num {
		color: #fcac45;
		-webkit-font-smoothing: antialiased;
	}
</style>
