import util from '../../utils/util'
import http from '../../utils/api'
import * as echarts from '../../components/ec-canvas/echarts'

let chart = null

Page({
  data: {
    ec: {
      onInit: (canvas, width, height) => {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart)
        return chart
      }
    },
    startTime: '',
    endTime: '',
    sum: 0,
    costList: []
  },
  onLoad() {
    const endTime = util.formatTime2(new Date())
    const startTime = util.getDateFromNow(new Date(), 100)
    this.setData({
      endTime: endTime,
      startTime: startTime
    })
  },
  onReady() {
    this.getCostListData()
  },
  // onShow() {
  //   this.getCostListData()
  // },
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
    http.getBillReport({
      data: {
        ...sendData
      },
      success:res => {
        this.setData({
          sum: res.sum,
          costList: res.result
        })
        let chartsData = {
          series: [
            {
              name: '账单统计',
              type: 'pie',
              data: res.result
            }
          ]
        }
        chart.setOption(chartsData)
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
  }
})
