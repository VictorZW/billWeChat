import http from '../../utils/api'
import utils from '../../utils/util'
const app = getApp()

Page({
  data: {
    allCategory: [],
    pay_date: '',
    cost: '',
    category: '',
    remark: ''
  },
  onLoad() {
    const date = utils.formatTime2(new Date())
    this.setData({
      pay_date: date
    })
  },
  onShow() {
    if (app.globalData.allCategory === null) {
      this.getAllCategory()
    } else {
      this.setData({
        allCategory: app.globalData.allCategory,
        category: app.globalData.allCategory === null ? '' : app.globalData.allCategory[0].category
      })
    }
  },
  getAllCategory() {
    http.getAllCategoryApi({
      data: {},
      success:res=>{
        app.globalData.allCategory = res.result
        this.setData({
          allCategory: res.result,
          category: res.result === null ? '' : res.result[0].category
        })
      },
      fail:err => {
        console.log(err)
      }
    })
  },
  // 时间
  bindDateChange(e) {
    this.setData({
      pay_date: e.detail.value
    })
  },
  // 金额
  bindKeyInput(e) {
    this.setData({
      cost: e.detail.value
    })
  },
  // 分类
  bindPickerChange(e) {
    const selectData = this.data.allCategory[e.detail.value]
    this.setData({
      category: selectData.category
    })
  },
  // 备注
  bindTextAreaInput(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  // 提交账单信息
  submitData() {
    const sendData = {
      pay_date: this.data.pay_date,
      cost: this.data.cost,
      category: this.data.category,
      remark: this.data.remark
    }
    for (let key in sendData) {
      // 在这里判断传过来的参数值为null，就删除这个属性
      if (key !== 'remark') {
        if (sendData[key] === null || sendData[key] === '') {
          wx.showToast({
            title: '请填写完整信息',
            icon: 'none',
            duration: 2000
          })
          return false
        }
      }
    }
    wx.showLoading({
      title: '正在提交',
      mask: true
    })
    http.addBillApi({
      data: {
        ...sendData
      },
      success:res => {
        wx.hideLoading()
        wx.showToast({
          title: res.message,
          icon: 'success',
          duration: 2000
        })
        this.setData({
          cost: '',
          category: '',
          remark: ''
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
  },
  // 跳转到新增类型页面
  toAddCategory() {
    wx.navigateTo({
      url: '/pages/addCategory/addCategory'
    })
  }
})
