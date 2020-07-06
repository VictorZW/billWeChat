import http from '../../utils/api'
import * as echarts from '../../components/ec-canvas/echarts'

let chart = null

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)
  return chart
}

Page({
  data: {
    ec: {
      onInit: initChart
    },
    startTime: '',
    endTime: '',
    sum: 0,
    costList: [],
    showEmptyIcon: false
  },
  setParamsData(data) {
    const params = data.detail
    this.setData({
      endTime: params.endTime,
      startTime: params.startTime
    })
    this.getCostListData()
  },
  onReady() {
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    http.getBillReport({
      data: {
        ...sendData
      },
      success:res => {
        wx.hideLoading()
        if (res.result.length === 0) {
          this.setData({
            sum: res.sum,
            costList: res.result,
            showEmptyIcon: true
          })
        } else {
          this.setData({
            sum: res.sum,
            costList: res.result,
            showEmptyIcon: false
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
          console.log(chart)
          chart && chart.setOption(chartsData)
        }
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
  }
})
