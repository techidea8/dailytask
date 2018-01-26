//index.js
//获取应用实例
var task = require("../../service/task");
var app = getApp()
Page({
  data: {
    panel:{
      "name":"默认",
      "value":0
    },
    prioritys:["紧急重要","紧急不重要","重要不紧急","不紧急也不重要"],
    priorityIndex: 0,
    date: "2016-09-01",
    time:"18:30",
    showmore:false,
    images:{
      "more0":"/assets/images/more.png",
      "more1": "/assets/images/more1.png",
    },
    haschange:false,
    content:""
  },
  updatetaskname:function(e){
    if (!!e.detail.value && e.detail.value.length>140){
          return ;
        }
        this.setData({
          "content":e.detail.value
        })
  },
  onShow:function(){
    var panels = wx.getStorageSync("panels");

        for(var i in panels){
          if(panels[i].checked==true){
            this.setData({
              "panel": panels[i]
            })
          }
         
        }
        console.log(panels)
        console.log(task.query())
  },
  createtask:function(){
        if(!this.data.content){
          return ;
        }
        task.create(this.data.content,this.data.panel.value);
        this.setData({
          "content":""
        })
  },
  bindprioritychange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      priorityIndex: e.detail.value,
      haschange:true
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      haschange: true
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value,
      haschange: true
    })
  },
  showmoreornot:function(){
          this.setData(
            {
              showmore: !this.data.showmore
            }
          )
  }
  
})
