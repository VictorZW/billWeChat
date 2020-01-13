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
  }
})
