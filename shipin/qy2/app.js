const comfun = require('./utils/comfun.js');
//app.js
App({
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("展示本地存储能力");

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res);
        console.log(res.authSetting['scope.userInfo']);
        //if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("getUserInfo----start");

              console.log(res.userInfo);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
       // }
      }
    })



    // var data = {
    //   'grant_type': 'password',
    //   'password': '123456',
    //   'username': '15032992879',
    //   'userType': 'enterprise'
    // }
    // var that = this
    // wx.request({
    //   url: 'http://58.87.91.223:8080/oauth/token', //仅为示例，并非真实的接口地址
    //   method: 'POST',
    //   data: data,
    //   header: {
    //     'Authorization': 'Basic d2ViYXBwOjg4ODg=',
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success: function (res) {
    //     console.log("gettoken start:");
    //     console.log(res);
    //     that.globalData.token_type = res.data.token_type;
    //     that.globalData.access_token = res.data.access_token;

    //     var tokenarray = res.data.access_token.split(".");
    //     var tokenone = comfun.base64_decode(tokenarray[1]);
    //     var enterprise = JSON.parse(tokenone.substring(0, tokenone.length - 1))
    //     wx.setStorageSync('enterprise', enterprise)
    //     wx.setStorageSync('enterpriseId', enterprise.enterpriseId)
    //     wx.hideLoading();
    //     //  resolve(res.data)
    //   },
    //   fail: function (error) {
    //     wx.hideLoading();
    //     // reject(false)
    //   },
    //   complete: function () {
    //     wx.hideLoading();
    //   }
    // })

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
  globalData: {
    BaseUrl:"http://shipinzp.com/api/",
    userInfo: null,
    access_token:"",
    token_type:"",
    mobile:''
  }
})