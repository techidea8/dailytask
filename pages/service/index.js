//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
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
    content:"",

  },
  bindprioritychange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      priorityIndex: e.detail.value,
      haschange:true
    })
  },
  updatetaskname: function (e) {
    if (!!e.detail.value && e.detail.value.length > 140) {
      return;
    }
    this.setData({
      "content": e.detail.value
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
  },
  submitquestion:function(){
      if(!this.data.content){
        app.util.warn("内容不能为空");
        return ;
      }
      wx.showToast({
        title: '信息已提交',
      })
  }
  
})
