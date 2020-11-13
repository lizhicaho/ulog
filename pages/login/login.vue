<template>
	<view class="login">
		<view class="login-title text-white text-sl text-center">{{lang.login_title}}</view>
		<view class="form-wrapper flex flex-direction margin-0-auto">
			<view class="bg-white radius flex flex-direction align-center">
				<view class="login-form-title text-bold text-xl margin-top-xl margin-bottom-xl">{{lang.login_form_title}}</view>
				<view class="login-form-username border-3-ccc margin-top-xs margin-bottom-xl">
					<input v-model='form.username' class="w-100 h-100 text-center text-df" type="text" value="" :placeholder="lang.login_form_username_placeholder" />
				</view>
				<view class="login-form-password border-3-ccc margin-top-xs margin-bottom-xl">
					<input v-model="form.password" class="w-100 h-100 text-center text-df" type="password" value="" :placeholder="lang.login_form_password_placeholder" />
				</view>

				<button type="primary" @tap='login' class="cu-btn login-btn text-xl margin-top-sm" :class="['bg-' + themeColor.name]">{{lang.login_submit_btn}}</button>
				
				<button type="primary" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" class="cu-btn login-btn text-xl margin-top-sm" :class="['bg-' + themeColor.name]">{{lang.login_with_wechat}}</button>
				<view class='cu-load load-modal' v-if="form.loadModal">
				  <!-- <view class='cuIcon-emojifill text-orange'></view> -->
				  <image src='../../static/images/header/logo.png' class='png' mode='aspectFit'></image>
				  <view class='gray-text'>正在登陆...</view>
				</view>

			</view>

			<view @tap='register' class="login-with-wechat text-df margin-top-auto text-white text-center text-btn">
				{{lang.login_register}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
					openid: '',
					loadModal:false
				}
			}
		},
		onLoad() {},
		methods: {
			async login() {
				if (!this.form.openid) {
					if (!this.form.username || !this.form.password) {
						this.$toast('请填写正确信息')
						return
					}
				} else {
					this.form.username = ''
					this.form.password = ''
				}
				
				let res = await uniCloud.callFunction({
					name: 'user',
					data: Object.assign({}, this.form, {type: 'get'})
				})
				if (res.result.code === 0) {
					//this.$toast('登陆成功')
					this.$relaunch('/home/home')
				} else {
					this.$toast(res.result.msg)
				}
			},
			
			
			
			
			wxGetUserInfo(){
							let _this = this
			                uni.getUserInfo({
			                    success: (res) => {
									uni.setStorage({
									                key: 'userinfo',
									                data: res.userInfo,
									                success: function () {
									                console.log('success');
									                  }
									                 });
			                    },
			                    fail: () => {
			                        console.log("未授权");
			                    }
			                })
							_this.form.loadModal=true
								uni.login({
									success(res) {
										console.log(res.code)
										
										uniCloud.callFunction({
											name: 'loginWithWechat',
											data:{
												js_code: res.code
											}
										}).then((res) => {
											
											
											uni.setStorage({
											    key: 'openid',
											    data: res.result.data.openid,
											    success: function () {
											        console.log('success');
											    }
											});
											
											_this.form.openid = res.result.data.openid
											
											_this.login()
											
											   
											    setTimeout(()=> {
											      
											        _this.form.loadModal=false
											     
											    }, 2000)
										})
									}
								})
			            },
			
			register() {			
				uni.navigateTo({
				 url: '/pages/register/register' ,
				 animationType:"slide-in-left", // 跳转动画
				 animationDuration: 800
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #999;
	}
	.login {
		.login-title {
			padding: 212rpx 0 50rpx 0;
		}

		.form-wrapper {
			width: 580rpx;
			height: 808rpx;

			.bg-white {
				height: 660rpx;

				.login-form-username {
					width: 400rpx;
					height: 88rpx;
					border-radius: 44rpx;
					overflow: hidden;
				}

				.login-form-password {
					@extend .login-form-username;
				}

				.login-btn {
					width: 400rpx;
					height: 88rpx;
					border-radius: 44rpx;
				}
			}
		}
	}
</style>
