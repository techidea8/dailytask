function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function post(uri,data,cb){
  wx.request({
    url: uri, //仅为示例，并非真实的接口地址
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      cb(res)
    }
  })
}
function warn(msg){
  wx.showToast({
    title: msg,
    image: "/assets/images/warn.png",


  })
}
module.exports = {
  formatTime: formatTime,
  post: post,
  warn: warn
}
