//index.js
//获取应用实例
var task = require("../../service/task");
var app = getApp()

Page({
  data: {
    tasks:[],
    panels: app.defaultpanel,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    height:1024,
    userInfo: {}
  },
  
  onLoad: function () {
    //console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    wx.getSystemInfo({
      success: function (res) {
       
        that.setData({
          height: res.windowHeight-70
        })
      }
    })

  },
  onShow:function(){
    var panels=wx.getStorageSync("panels");
    var tasks = wx.getStorageSync("tasks");
    var o = []
    for (var i in panels){
      if (!!panels[i].name){
        o.push(panels[i]);
      }
    }
    this.setData({
      "panels": o,
      "tasks":tasks
    })
  },
  completetask:function(e){
    
   var list =  task.complete(e.target.dataset.id);
   this.setData({
    
     "tasks": list
   })
  },
  changepanel:function(a){
    var idx = a.detail.current;
    wx.setNavigationBarTitle({
      title: this.data.panels[idx].name
    })
  }
})