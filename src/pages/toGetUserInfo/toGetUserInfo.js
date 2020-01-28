import http from "../../utils/api"
const app = getApp()

Page({
  data: {
    appIconUrl: '../../images/app_icon.png',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad() {
    // 查看是否授权
    wx.getSetting({
      success: (res) => {
        // 如果用户授权了
        if (res.authSetting['scope.userInfo']) {
          this.toLogin()
        }
      }
    })
  },
  onShow() {
    wx.hideHomeButton()
  },
  toLogin() {
    // 登录
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.login({
      success: res => {
        const code = res.code
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (code) {
          wx.getUserInfo({
            success: res => {
              const userInfo = res.userInfo
              const username = userInfo.nickName
              const avatarUrl = userInfo.avatarUrl
              http.loginApi({
                data: {
                  username: username,
                  avatarUrl: avatarUrl,
                  code: code
                },
                success: res => {
                  app.globalData.userInfo = res.result
                  wx.hideLoading()
                  wx.setStorageSync('token', res.result.token)
                  wx.switchTab({
                    url: '../addBill/addBill'
                  })
                },
                fail: err => {
                  wx.hideLoading()
                  console.log(err)
                }
              })
            }
          })
        } else {
          wx.hideLoading()
          console.info('获取用户登录凭证失败')
        }
      }
    })
  },
  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      // 用户按了允许授权按钮
      this.toLogin()
    } else {
      // 用户按了拒绝按钮
      // wx.showToast({
      //   title: '靠北，你确定不授权？',
      //   icon: 'none',
      //   duration: 2000
      // })
    }
  }
})
