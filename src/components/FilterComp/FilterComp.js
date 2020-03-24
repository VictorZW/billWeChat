import util from "../../utils/util";

/**
 * @Author: zhangwei
 * @Date: 2020/3/24 4:09 PM
 * @desc:
 **/
Component({
  data: {
    startTime: '',
    endTime: '',
  },
  pageLifetimes: {
    show: function() {
      const paramsDate = wx.getStorageSync('paramsDate') || {}
      if (paramsDate.startTime) {
        // 如果存在
        this.setData({
          endTime: paramsDate.endTime,
          startTime: paramsDate.startTime
        })
      } else {
        const endTime = util.formatTime2(new Date())
        const startTime = util.getDayOfMonth(new Date())
        const paramsDate = {
          startTime,
          endTime
        }
        wx.setStorageSync('paramsDate', paramsDate)
        this.setData({
          endTime: endTime,
          startTime: startTime
        })
      }
      const data = {
        startTime: this.data.startTime,
        endTime: this.data.endTime
      }
      this.triggerEvent('setParamsData', data)
    }
  },
  methods: {
    bindStartDateChange(e) {
      this.setData({
        startTime: e.detail.value
      })
      const data = {
        startTime: this.data.startTime,
        endTime: this.data.endTime
      }
      wx.setStorageSync('paramsDate', data)
      this.triggerEvent('setParamsData', data)
    },
    bindEndDateChange(e) {
      this.setData({
        endTime: e.detail.value
      })
      const data = {
        startTime: this.data.startTime,
        endTime: this.data.endTime
      }
      wx.setStorageSync('paramsDate', data)
      this.triggerEvent('setParamsData', data)
    }
  }
})
