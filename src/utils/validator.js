/**
 * 验证邮箱
 * @param {String} value
 * @returns {Boolean}
 */
export function isEmail(value) {
  // 增加公司邮箱中常见字符：.
  var emailRegExp = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return emailRegExp.test(value)
}

/**
 * 验证json字符串
 * @param {String} value
 * @returns {Boolean}
 */
export function isJson(value) {
  try {
    JSON.parse(value)
    return true
  } catch (e) {
    return false
  }
}

/**
 * 验证对象
 * @param {any} value
 * @returns {Boolean}
 */
export function isObject(value) {
  return Object.prototype.toString.call(value) == '[object Object]'
}
