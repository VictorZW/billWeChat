const app = getApp()

Page({
  data: {
    userInfo: {}
  },
  onLoad() {
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  }
})
