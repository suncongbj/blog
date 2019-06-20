const comfun = require('./utils/comfun.js');
//app.js
App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  
  getUserInfo:function(cb){
    console.log("cdddddd");
    var that = this
    console.log(this.globalData.userInfo);
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          console.log("login0000");
          wx.getUserInfo({
            success: function (res) {
              console.log("getUserInfo00000");
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  regexConfig: function() {
    var reg = {
      email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
      phone: /^1(3|4|5|7|8)\d{9}$/
    }
    return reg;
  },
  globalData: {
    BaseUrl:"https://www.shipinzp.com:8443/api/",
    LoginPath: "https://www.shipinzp.com:8442/oauth/token",
    userInfo: null,
    access_token:"",
    token_type:"",
    mobile:''
  }
})