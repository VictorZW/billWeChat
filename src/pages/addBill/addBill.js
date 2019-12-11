import http from '../../utils/api'

Page({
  data: {
    date: '2019-12-11',
    category: []
  },
  onLoad: function() {
    http.getAllCategoryApi({
      success:res=>{
        console.log('接口请求成功', res.result)
        this.setData({
          category: res.result
        })
      },
      fail:err => {
        console.log(err)
      }
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  }
})
