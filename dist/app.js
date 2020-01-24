//app.js
import http from './utils/api'

App({
  onLaunch() {
    const token = wx.getStorageSync('token') || ''

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
        this.globalData.userInfo = res.result
        this.getAllCategory()
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 获得所有账单分类
  getAllCategory() {
    http.getAllCategoryApi({
      data: {},
      success:res=>{
        this.globalData.allCategory = res.result
        wx.hideLoading()
        wx.switchTab({
          url: './pages/addBill/addBill'
        })
      },
      fail:err => {
        wx.hideLoading()
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    allCategory: null
  }
})
