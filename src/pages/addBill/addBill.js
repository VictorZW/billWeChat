import http from '../../utils/api'
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
    const token = wx.getStorageSync('token') || ''
    if (token === null || token === '') {
      console.log('还未登陆')
    } else {
      if (app.globalData.allCategory) {
        this.setData({
          allCategory: app.globalData.allCategory
        })
      } else {
        this.getAllCategory()
      }
    }
  },
  onShow() {
    this.setData({
      allCategory: app.globalData.allCategory
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
  getAllCategory() {
    http.getAllCategoryApi({
      data: {},
      success:res=>{
        app.globalData.allCategory = res.result
        this.setData({
          allCategory: res.result
        })
      },
      fail:err => {
        console.log(err)
      }
    })
  },
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
          pay_date: '',
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
  toAddCategory() {
    wx.navigateTo({
      url: '/pages/addCategory/addCategory'
    })
  }
})
