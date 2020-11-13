<template>
	<div>
		<cu-custom :bgColor="'bg-'+themeColor.name" :isBack="true" :icon="'sort'">
			
			<block slot="content">{{lang.my}}</block>
		</cu-custom> 
		<scroll-view scroll-y class="scrollPage">
		  <view class="UCenter-bg">
		    <image :src="userinfo.avatarUrl" class="cu-avatar round" mode="widthFix"></image>
		    <view class="text-xl">{{userinfo.nickName}}
		      <text class="cuIcon-friendaddfill lg text-red"></text>
		    </view>
		    <view class="margin-top-sm">
		      <text >By:6组的小垃圾</text>
		    </view>
		    <image src="//img95.699pic.com/photo/40143/6179.gif_wh860.gif" mode="scaleToFill" class="gif-wave"></image>
		  </view>
		  <view class="padding flex text-center text-grey bg-white shadow-warp">
		    <view class="flex flex-sub flex-direction solid-right">
		      <view class="text-xxl text-orange">{{visitTotal}}</view>
		      <view class="margin-top-sm">
		        <text class="cuIcon-attentionfill"></text> View</view>
		    </view>
		    <view class="flex flex-sub flex-direction solid-right">
		      <view class="text-xxl text-blue">{{starCount}}</view>
		      <view class="margin-top-sm">
		        <text class="cuIcon-favorfill"></text> Star</view>
		    </view>
		    <view class="flex flex-sub flex-direction">
		      <view class="text-xxl text-green">{{forksCount}}</view>
		      <view class="margin-top-sm">
		        <text class="cuIcon-fork"></text> Fork</view>
		    </view>
		  </view>
		  <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
		    <view class="cu-item arrow"  @click='changeTheme' data-target="RadioModal">
		      <navigator class="content"  hover-class="none" >
		        <image src="/static/images/header/logo.png" class="png" mode="aspectFit"></image>
		        <text class="text-grey">背景切换</text>
		      </navigator>
		    </view>
		   
		    <view class="cu-item arrow">
		      <view class="content" @tap="showQrcode">
		        <text class="cuIcon-appreciatefill text-red"></text>
		        <text class="text-grey">赞赏支持</text>
		      </view>
		    </view>
		    <view class="cu-item arrow">
		      <navigator class="content" url="./fileup" hover-class="none">
		        <text class="cuIcon-top text-green"></text>
		        <text class="text-grey">简历模板上传</text>
		      </navigator>
		    </view>
		    <view class="cu-item arrow">
		      <navigator class="content" url="/pages/login/login" hover-class="none">
		        <text class="cuIcon-creativefill text-orange"></text>
		        <text class="text-grey">退出登录</text>
		      </navigator>
		    </view>
			
			
		  </view>
		  <view class="cu-tabbar-height"></view>
		</scroll-view>
		
				<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="modalName =''">
					<view class="cu-dialog" @tap.stop="">
						<radio-group class="block" @change="RadioChange">
							<view class="cu-list menu text-left">
								<view class="cu-item" v-for="(item,index) in themeList" :key="index">
									<label class="flex justify-between align-center flex-sub">
										<view class="flex-sub flex">
											<view>{{item.title}}</view>
											<view :style="{backgroundColor: item.color}" style='height: 50rpx;width: 100rpx;margin-left: 30rpx;'></view>
										</view>
										<radio class="round" :class="radio=='radio' + index?'checked':''" :checked="radio=='radio' + index?true:false"
										 :value="item.name"></radio>
									</label>
								</view>
							</view>
						</radio-group>
					</view>
				</view>
				
				
	</div>
	
</template>

<script>
	import {ColorList} from './theme.js'
	export default {
		data() {
			return {
				radio: '',
				modalName: '',
				themeList: [],
				starCount: 5,
				forksCount: 6,
				visitTotal: 3,
				userinfo:{}
			}
		},
		onLoad() {
		let _this=this
		const opid=uni.getStorage({
			key:'userinfo',
			success: function (res) {
			        console.log(res.data);
					_this.userinfo = res.data
					console.log(_this.userinfo);
			    }
		
			
			
		})
		},
		methods: {
			
			changeTheme(e){
				this.themeList = []
				for (let i = 0;i<ColorList.length;i++) {
					let random = Math.floor(Math.random() * ColorList.length)
					let item = ColorList[random]
					this.themeList.indexOf(item) === -1 && this.themeList.push(item)
					if (this.themeList.length > 5) break
				}
				this.modalName = e.currentTarget.dataset.target
			},
			showQrcode(){
				
      uni.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
      })
    },
			RadioChange(e) {
				let name = e.detail.value
				let obj = this.themeList.filter(item => {
					return item.name === name
				})
				this.$store.commit('setThemeColor', obj[0])
				this.modalName = ''
			},
			async onSend() {
				const res = await this.$uniCloud('sendSubscribe')
				console.log(res)
			}
		}
	}
</script>

<style>
button{
	margin-top: 20rpx;
}
.UCenter-bg {
  background-image: url(https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2695696613,516091751&fm=26&gp=0.jpg);
  background-size: cover;
  height: 450rpx;
  display: flex;
  justify-content: center;
  padding-top: 40rpx;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-weight: 300;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.UCenter-bg text {
  opacity: 0.8;
}

.UCenter-bg image {
  width: 200rpx;
  height: 200rpx;
}

.UCenter-bg .gif-wave{
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}

map,.mapBox{
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}

map,.mapBox{
  width: 750rpx;
  height: 300rpx;
}
</style>
