//app.js
import http from './utils/api'

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    const token = wx.getStorageSync('token') || ''
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // token为空,需要登录从后台获取token
    if (token === null || token === '') {
      wx.reLaunch({
        url: './pages/toGetUserInfo/toGetUserInfo'
      })
    } else {
      this.queryUserInfo(token)
    }
  },
  // 通过token去后台获取用户的信息
  queryUserInfo(token) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    http.queryUserInfoApi({
      data: {
        token: token
      },
      success: res => {
        wx.hideLoading()
        this.globalData.userInfo = res.result
        wx.switchTab({
          url: './pages/addBill/addBill'
        })
      },
      fail: err => {
        wx.hideLoading()
        console.log(err)
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
