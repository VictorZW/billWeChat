/**
 * @Author: zhangwei
 * @Date: 2019/12/11 11:45 PM
 * @desc:
 **/
const baseUrl = 'https://www.haha2haha.com/api'

module.exports = {
  http(url, method, params) {
    let token = wx.getStorageSync('token') || ''
    let data = {
      token
    }
    if (params.data) {
      // 在这里判断一下data是否存在，params表示前端需要传递的数据，params是一个对象，有三组键值对，
      // data：表示请求要发送的数据，
      // success：成功的回调，
      // fail：失败的回调，这三个字段可缺可无，其余字段会忽略
      for (let key in params.data) {
        // 在这里判断传过来的参数值为null，就删除这个属性
        if (params.data[key] === null || params.data[key] === 'null') {
          delete params.data[key]
        }
      }
      data = { ...data, ...params.data }
    }
    wx.request({
      url: baseUrl + url, // 就是拼接上前缀,此接口域名是开放接口，可访问
      method: method === 'post' ? 'post' : 'get', // 判断请求类型，除了值等于'post'外，其余值均视作get
      data,
      header: {
        'content-type': method === 'get' ? 'application/json' : 'application/x-www-form-urlencoded'
      },
      success(res) {
        params.success&&params.success(res.data)
      },
      fail(err) {
        params.fail&&params.fail(err)
      }
    })
  }
}
