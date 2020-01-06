const app = getApp()

Page({
  data: {
    appIconUrl: '../../images/app_icon.png',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad() {
    console.log(this.data.canIUse)
    // 查看是否授权
    wx.getSetting({
      success: (res) => {
        console.log('1111')
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: () => {
              //从数据库获取用户信息
              this.queryUserInfo()
              //用户已经授权过
              wx.switchTab({
                url: '../addBill/addBill'
              })
            }
          });
        }
      }
    })
  },
  queryUserInfo() {
    console.log('111')
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
