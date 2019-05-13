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
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo, 
        hasUserInfo: true
      })
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  jobSeeker: function() {
    wx.navigateTo({
      url: '../seeker/seeker'
    })
  }
})
