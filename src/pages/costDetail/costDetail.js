import http from '../../utils/api'
const util = require('../../utils/util.js')

Page({
  data: {
    costList: [],
    token: ''
  },
  onLoad() {
    const token = wx.getStorageSync('token') || ''
    this.setData({
      token: token
    })
    this.getCostListData()
  },
  getCostListData() {
    http.getAllBill({
      data: {
        token: this.data.token
      },
      success:res => {
        this.setData({
          costList: res.result
        })
      },
      fail:err => {
        console.log(err)
      }
    })
  },
  onPullDownRefresh() {
    http.getAllBill({
      data: {
        token: this.data.token
      },
      success:res => {
        wx.stopPullDownRefresh()
        this.setData({
          costList: res.result
        })
      },
      fail:err => {
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})
