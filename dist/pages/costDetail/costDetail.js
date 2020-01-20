import http from '../../utils/api'
import util from '../../utils/util'

Page({
  data: {
    costList: [],
    startTime: '',
    endTime: '',
    category: '',
    sum: 0
  },
  onLoad() {
    const endTime = util.formatTime2(new Date())
    const startTime = util.getDateFromNow(new Date(), 100)
    this.setData({
      endTime: endTime,
      startTime: startTime
    })
    this.getCostListData()
  },
  getCostListData() {
    if (this.data.startTime > this.data.endTime) {
      wx.showToast({
        title: '开始时间不能大于结束时间',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    const sendData = {
      startTime: this.data.startTime,
      endTime: this.data.endTime
    }
    http.getAllBill({
      data: {
        ...sendData
      },
      success:res => {
        this.setData({
          costList: res.result,
          sum: res.sum
        })
      },
      fail:err => {
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  onPullDownRefresh() {
    this.getCostListData()
    wx.stopPullDownRefresh()
  },
  bindStartDateChange(e) {
    this.setData({
      startTime: e.detail.value
    })
    this.getCostListData()
  },
  bindEndDateChange(e) {
    this.setData({
      endTime: e.detail.value
    })
    this.getCostListData()
  }
})
