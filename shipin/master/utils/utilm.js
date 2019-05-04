function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 转换成xxxx年xx月xx日
*/
function formatDate(time) {
  var date = new Date(time)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return year + "-" + month + "-" + day + ""
}

/**
 * 转换成xxxx-xx-xx
*/
function formatDate_(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

/**
 * 转换成xxxx年xx月
*/
function formatMonth(date) {
  var year = date.getFullYear()
  var month = formatNumber(date.getMonth() + 1)
  var day = date.getDate()
  return year + "-" + month + ""
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 时间字符分割
 * retun xxxx年xx月
*/
function splitDate(val) {
  var strs = new Array()
  strs = val.split("-")
  return strs[0] + "-" + strs[1] + ""
}

function splitDayDate(val) {
  var strs = new Array()
  strs = val.split("-")
  return strs[0] + "-" + strs[1] + "-" + strs[2]
}


/**
 * 字符截取
 * val：要截取的字符 length:截取的长度
 */
function subString(val, length) {
  return val.substring(0, length)
}

/**
 * 手机号验证
 */
function verifyPhoneNumber(n) {
  var partten = /^1[3-9]\d{9}$/
  return partten.test(n)
}

/**
 * 身份证验证
 */
function verifyCard(n) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    return reg.test(n)
}

/**
 * 邮箱验证
 */
function verifyEmail(n) {
  var szreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return szreg.test(n)
}

module.exports = {
  formatTime: formatTime,
  formatMonth: formatMonth,
  formatDate: formatDate,
  formatDate_: formatDate_,
  splitDate: splitDate,
  subString: subString,
  verifyPhoneNumber: verifyPhoneNumber,
  verifyCard: verifyCard,
  verifyEmail: verifyEmail,
  splitDayDate: splitDayDate
}
