const app = getApp()
const receiveResume = app.globalData.BaseUrl + 'unified-history-positionDelivery/receiveResume'//?page=1&size=10
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  sharelink:function(){
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  ClearCache:function(){
    wx.clearStorage()
    wx.clearStorageSync()
    wx.showToast({
      title: '清除完成！',
      icon: 'success',
      duration: 1000
    })
    setTimeout(function(){
      wx.redirectTo({
        url: '../login/login'
      })
    },1000)
  },
  onLoad: function () {
    this.getUserInfo()
    //调用应用实例的方法获取全局数据
  },
  getUserInfo: function(e) {
    let that = this
    var user_info = wx.getStorageSync('enterprise')
    wx.request({
        url: app.globalData.BaseUrl + 'enterprise-user-enterpriseUser', //仅为示例，并非真实的接口地址
        method: 'GET',
        data: {
          id: user_info.userId,
          projection: 'info'
        },
        header: {
          'Authorization': app.globalData.token_type + " " + app.globalData.access_token,
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          let infos = res.data._embedded.enterpriseUsers[0]
          if(infos.avatarUrl && infos.name) {
            that.setData({
              userInfo:{
                avatarUrl: infos.avatarUrl,
                nickName: infos.name
              }, 
              hasUserInfo: true
            })
          }else{
            app.getUserInfo(function(userInfo){
              that.setData({
                userInfo:userInfo, 
                hasUserInfo: true
              })
            })
          }
        },
      })
  },
  jobSeeker: function() {
    wx.navigateTo({
      url: '../seeker/seeker'
    })
  }
})
