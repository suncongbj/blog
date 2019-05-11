const app = getApp()
const receiveResume = app.globalData.BaseUrl + 'unified-history-positionDelivery/receiveResume'//?page=1&size=10
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
    wx.request({
        url: receiveResume,
        header: {
          'Authorization': app.globalData.token_type + " " + app.globalData.access_token,
          'content-type': 'application/json' // 默认值
        },
        data: {
          page: 1,
          size: 10,
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          
        },
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
