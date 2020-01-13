import http from '../../utils/api'
const util = require('../../utils/util.js')

Page({
  data: {
    costList: []
  },
  onLoad() {
    this.getCostListData()
  },
  getCostListData() {
    http.getAllBill({
      data: {},
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
      data: {},
      success:res => {
        wx.stopPullDownRefresh()
        this.setData({
          costList: res.result
        })
      },
      fail:err => {
        wx.stopPullDownRefresh()
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})
