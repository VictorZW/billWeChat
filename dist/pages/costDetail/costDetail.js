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
  }
})
