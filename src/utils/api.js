/**
 * @Author: zhangwei
 * @Date: 2019/12/11 11:48 PM
 * @desc:
 **/
// 在这里面定义所有接口，一个文件管理所有接口，易于维护
// 引入刚刚封装好的http模块，import属于ES6的语法，微信开发者工具必须打开ES6转ES5选项
import { http } from './http'

// 请求所有分类的接口
function getAllCategoryApi(params){
  http('/category/getCategory','get',params)
}

export default {
  getAllCategoryApi
}
