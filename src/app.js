//app.js
import http from './utils/api'

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    const token = wx.getStorageSync('token') || ''
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    if (token === null || token === '') {
      // token为空,需要登录从后台获取token
      this.login()
    } else {
      this.queryUserInfo(token)
    }
  },
  login() {
    // 登录
    wx.login({
      success: res => {
        const code = res.code
        console.log('code:', code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (code) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
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
                  console.log(res.result)
                  wx.setStorageSync('token', res.result.token)
                },
                fail: err => {
                  console.log(err)
                }
              })
            }
          })
        } else {
          console.info('获取用户登录凭证失败')
        }
      }
    })
  },
  queryUserInfo(token) {
    http.queryUserInfoApi({
      data: {
        token: token
      },
      success: res => {
        console.log(res.result)
        this.globalData.userInfo = res.result
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
