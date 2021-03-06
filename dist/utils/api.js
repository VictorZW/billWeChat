/**
 * @Author: zhangwei
 * @Date: 2019/12/11 11:48 PM
 * @desc:
 **/
// 在这里面定义所有接口，一个文件管理所有接口，易于维护
// 引入刚刚封装好的http模块，import属于ES6的语法，微信开发者工具必须打开ES6转ES5选项
import { http } from './http'

// 请求所有分类的接口
function getAllCategoryApi(params) {
  http('/category/getCategory', 'get', params)
}

// 新增账单信息
function addBillApi(body) {
  http('/bill/addBill', 'post', body)
}

function delBillApi(body) {
  http('/bill/delBill', 'post', body)
}

// 查询所有费用数据
function getAllBill(body) {
  http('/bill/getAllBill', 'post', body)
}

// 登录
function loginApi(body) {
  http('/users/login', 'post', body)
}

// 获取用户信息
function queryUserInfoApi(body) {
  http('/users/queryUserInfo', 'post', body)
}

// 新增账单类型
function addCategory(body) {
  http('/category/addCategory', 'post', body)
}

// 查询饼图数据
function getBillReport(body) {
  http('/bill/getBillReport', 'post', body)
}

export default {
  getAllCategoryApi,
  addBillApi,
  delBillApi,
  getAllBill,
  loginApi,
  queryUserInfoApi,
  addCategory,
  getBillReport
}
