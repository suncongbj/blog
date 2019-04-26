//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    meList:[
      {
        text:'求职者列表',
        icon:'../../images/iconfont-dingdan.png',
        url:'../bookList/bookList'
      },
            {
        text:'职位管理',
        icon:'../../images/iconfont-help.png',
        url:''
      },
      //       {
      //   text:'清空缓存',
      //   icon:'../../images/iconfont-icontuan.png',
      //   url:''
      // },
            {
        text:'分享',
        icon:'../../images/iconfont-kefu.png',
        url:''
      },
       
    ]
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
  }
})
