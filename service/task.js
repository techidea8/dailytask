var util = require ("../utils/util");

function create(name,panel){
  var task = { "name": name, panel: panel, pri: 0, "createat": util.formatTime(new Date()),"endat": util.formatTime(new Date()),"stat":"IDLE",id:new Date().getTime()};
  var list = wx.getStorageSync("tasks");
  if(!list){
    list = [];
  }
  list.unshift(task);
  wx.setStorageSync("tasks",list);
}
function query(name) {
 var list =  wx.getStorageSync("tasks");
 var obj = [];
 for(var i in list){
   if (!name || list[i].name.indexOf(name)>-1){
         obj.push[list[i]]; 
   }
 }
 obj.sort(function(a,b){
      return a.id>b.id;
 })
 return obj;
}
function complete(id) {
  var list = wx.getStorageSync("tasks");
  var obj = [];
  for (var i in list) {
    if(list[i].id==id){
      list[i].stat="CLOSE";
    }
  }
  wx.setStorageSync("tasks",list);
  return list;
}

function cancel(id) {
  var list = wx.getStorageSync("tasks");
  var obj = [];
  for (var i in list) {
    if (list[i].id == id) {
      list[i].stat = "DEL";
    }
  }
  return list;
}
function edit(obj) {
  var list = wx.getStorageSync("tasks");
  var obj = [];
  for (var i in list) {
    if (list[i].id == obj.id) {
      for(var j in obj){
          list[i][j] = obj[j];
      }
    }
  }
  return list;
}

module.exports = {
  create: create,
  query: query,
  complete: complete,
  edit: edit,
  cancel: cancel
}
