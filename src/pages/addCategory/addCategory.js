const app = getApp()

Page({
  data: {
    allCategory: []
  },
  onLoad() {
    this.setData({
      allCategory: app.globalData.allCategory
    })
    console.log(app.globalData.allCategory)
  }
})
