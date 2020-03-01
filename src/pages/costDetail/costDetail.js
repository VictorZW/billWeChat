import http from '../../utils/api'
import util from '../../utils/util'

Page({
  data: {
    costList: [],
    startTime: '',
    endTime: '',
    category: '',
    sum: 0,
    slideButtons: [
      {
        id: 1,
        type: 'warn',
        text: '删除',
        extClass: 'delData'
      }],
    dialogShow: false,
    buttons: [
      {
        id: 1,
        text: '取消'
      },
      {
        id: 2,
        text: '确定'
      }],
    chooseData: ''
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
  },
  slideButtonTap(e) {
    this.setData({
      chooseData: e.currentTarget.dataset.choosed
    })
    if (e.detail.index === 0) {
      // 删除账单按钮
      this.openConfirm()
    }
  },
  openConfirm() {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    if (e.detail.item.text === '确定') {
      console.log('确定删除')
      const sendData = {
        id: this.data.chooseData.id
      }
      http.delBillApi({
        data: {
          ...sendData
        },
        success:res => {
          wx.showToast({
            title: res.message,
            icon: 'success',
            duration: 2000
          })
          this.getCostListData()
        },
        fail:err => {
          wx.showToast({
            title: err,
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      console.log('不删除')
    }
    this.setData({
      dialogShow: false,
      chooseData: ''
    })
  }
})
