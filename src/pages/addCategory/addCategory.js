import http from '../../utils/api'
const app = getApp()

Page({
  data: {
    allCategory: [],
    showPop: false,
    buttons: [
      {
        type: 'primary',
        className: 'submit-btn',
        text: '确定',
        value: 1
      }
    ]
  },
  onLoad() {
    this.setData({
      allCategory: app.globalData.allCategory
    })
  },
  open() {
    this.setData({
      showPop: true
    })
  },
  buttonTap(e) {
    if (e.detail.category) {
      wx.showLoading({
        title: '正在提交',
        mask: true
      })
      http.addCategory({
        data: {
          category: e.detail.category
        },
        success:res => {
          wx.hideLoading()
          wx.showToast({
            title: res.message,
            icon: 'success',
            duration: 2000
          })
          app.globalData.allCategory = res.result
          this.setData({
            showPop: false,
            allCategory: res.result
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
    } else {
      wx.showToast({
        title: '请填写正确的类型',
        icon: 'none',
        duration: 2000
      })
    }
  }
})
