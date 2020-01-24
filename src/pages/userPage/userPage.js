const app = getApp()

Page({
  data: {
    userInfo: {}
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },
  loginOut() {
    wx.removeStorageSync('token')
    app.globalData.userInfo = null
    wx.reLaunch({
      url: '../toGetUserInfo/toGetUserInfo'
    })
  }
})
