// Tue Jan 14 2020 10:03:49 GMT+0800 (中国标准时间) -> 2020/01/14 10:03:23
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 2020-01-02
const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

// 当前时间的n天前
const getDateFromNow = (date, n) => {
  const handleDate = new Date(date.getTime() - n * 24 * 3600 * 1000)
  return formatTime2(handleDate)
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 小数点取值n位小数
const decimals = (num, n) => {
  const pow = Math.pow(10, n)
  return Math.round(num * pow) / pow
}

module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2,
  getDateFromNow: getDateFromNow,
  decimals: decimals
}
