// pages/me/main.js
var app = getApp();
var myResume_path = app.getpath + "/api/personal-user-perSonalUser/resume/";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    rightimg: '/images/jian_r.png',
    userListInfo: [{
      icon: '/images/myorder.png',
      type:'1',
      text: '求职进展',
      link: '/pages/resume/detail',
      isunread: true

    }, {
        icon: '/images/icon-me1.png',
        type: '5',
        text: '用户认证',
        link: '/pages/resume/detail',
        isunread: true

      }, {
      icon: '/images/myresume.png',
      text: '简历管理',
        type: '2',
      link: '/pages/resume/edit',
      isunread: false

    }, {
      icon: '/images/myjobwanted.png',
      link: '/pages/myjob/myjob',
      type: '3',
      text: '转发'
    }, {
      icon: '/images/myhelp.png',
      link: '/pages/aboutus/aboutus',
        type: '4',
      text: '清除缓存'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  }, 
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorageSync("userInfo", e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showMyResume: function () {
    var that = this;
    wx.request({
      url: myResume_path + app.getUserId(),
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Authorization': app.getAuthorization(),
        'content-type': 'application/json',
        'access_token': app.getaccess_token()
      },
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log("返回", res)
        if (res.statusCode == 200) {
          var obj = res.data;
          var userInfo = wx.getStorageSync("userInfo")
          if (obj.name != null && obj.name != '') {
            obj.nickName = obj.name
            that.setData({
              userInfo: obj,
              hasUserInfo: true
            })
          }
         
        } else if (res.statusCode == 401) {
          app.validToken();
          return;
        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.validLogin();
    this.showMyResume();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
     
      return {
        title: '转发',
        path: '/pages/index/main',
        success: function (res) { }
      }
     
   
  },
  clickNavigatorPage:function(e){
    var type = e.currentTarget.dataset.type;
    if(type==4){
      //清除缓存
      wx.clearStorage();
      wx.showToast({
        title: '清除成功',
      })
    }else if(type==3){
      //转发
      
    } else if (type == 2) {
      wx.switchTab({
        url: '../resume/main',
      })
    } else if (type == 1) {
      wx.request({
        url: app.getpath + '/api/unified-history-positionDelivery',
        data: {
          userId: app.getUserId(),
          lookOver: false,
          projection: 'info',
          page: 1,
          size: 30
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'Authorization': app.getAuthorization(),
          'content-type': 'application/json',
          'access_token': app.getaccess_token()
        },
        // header: {}, // 设置请求的 header
        success: function (res) {

        }
      })
      wx.showModal({
        title: '友情提示',
      showCancel:false,
        content: '请前往APP查看',
      })
    } else if (type == 5) {
      if(wx.getStorageSync('cerStatus')) {
        return wx.showToast({
          title: '已认证',
          icon: 'none'
        })
      }
      
      wx.navigateTo({
        url: '../userAuthentication/userAuthentication',
      })
    }
    
  }
})