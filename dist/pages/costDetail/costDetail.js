import http from '../../utils/api'
import utils from "../../utils/util";
const util = require('../../utils/util.js')

Page({
  data: {
    costList: [],
    startTime: '',
    endTime: '',
    category: ''
  },
  onLoad() {
    const endTime = utils.formatTime2(new Date())
    const startTime = utils.getDateFromNow(new Date(), 100)
    console.log(startTime)
    this.getCostListData()
    this.setData({
      endTime: endTime,
      startTime: startTime
    })
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
  },
  bindStartDateChange(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndDateChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  }
})
