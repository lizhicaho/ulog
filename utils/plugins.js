import Vue from 'vue'
import store from '../store';

Vue.prototype.$store = store;

Vue.prototype.$toast = (title, duration = 1500) => uni.showToast({
	icon: 'none',
	title,
	duration
})

// 跳转底部 tabbar 对应的页面
Vue.prototype.$switchTab = (url) => uni.switchTab({
 url: '/pages' + url
})
// 关闭其它页面，跳转
Vue.prototype.$relaunch = (url) => uni.reLaunch({
 url: '/pages' + url
})

Vue.prototype.$uniCloud = async (name, data) => {
	uni.showLoading()
	try{
		let res = await uniCloud.callFunction({
			name,
			data
		})
		return res
	} catch(e) {
		return e
	} finally{
		uni.hideLoading()
	}
	
	
}