//index.js
//获取应用实例
var app = getApp()
Page({
  data:{
    newpanel:{
      value:new Date().getTime(),
      name:"",
      checked:false
    },
    panels: app.defaultpanel,
  },
  onShow: function () {
      var that = this;
       wx.getStorage({
         key: 'panels',
        success: function(res) {
          var panel =res.data;
          if(panel!=null){
            that.setData({
              "panels": panel
            })
          }
        }
      })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var panels = this.data.panels;
    for (var i = 0, len = panels.length; i < len; ++i) {
      panels[i].checked = panels[i].value == e.detail.value;
    }

    this.setData({
      panels: panels
    });
    wx.setStorage({
      key: "panels",
      data: panels
    })
  },
  deletepanel:function(e){
      var that = this;
      var id = e.target.dataset.id;
      if (parseInt(id)<1000){
         app.util.warn("该看板不能删除");
        return ;
      }
      if(!id){
        return ;
      }
      wx.showModal({
        title: '天天看版',
        content: '你确定要删除该看板吗?',
        success:function(res){
          if (res.confirm){
            that._deletepanel(id);
          }
          
        }
      })
  },
  _deletepanel:function(id){
    this.data.panels.push(this.data.newpanel);
    var o = [];
    for (var i in this.data.panels){
      if (this.data.panels[i].value!=id){
        o.push(this.data.panels[i]);
      }
    }
   
    this.setData({
      panels: o
    });
    wx.setStorageSync("panels", o);
  },
  createpanel: function (e) {
    if(!this.data.newpanel.name){
      return ;
    }
    this.data.panels.push(this.data.newpanel);
    wx.setStorageSync("panels", this.data.panels);
    this.setData({
      panels: this.data.panels
    });
    this.setData({
      "newpanel.name": ""
    });
  },
  bindnewpanel:function(e){
    this.setData(
      {"newpanel":{
            "value":new Date().getTime(),
            "name":e.detail.value,
            checked: false 
          }}
          )
  }
 
})
