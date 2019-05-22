var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  shwoData: function () {
    var that = this
    var path = app.getpath + "/api/personal-position-educationExperience?page=1&size=100&projection=manage&userId=" + app.getUserId();
    wx.request({
      url: path,
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
        if (res.statusCode == 200) {
          var data = res.data._embedded.educationExperiences
          that.setData({
            list:data
          })
        } else if (res.statusCode == 401) {
          app.validToken();
          return;
        }
      },
      fail: function () {
        // fail
        toash('服务器异常');
      },
      complete: function () {
        // complete
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.shwoData()
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

  },
  addInfo:function(){
    wx.navigateTo({
      url: '../educationbg/add',
    })
  },
  mylongtap:function(e){
    var id = e.currentTarget.id
    var that = this
    var path = app.getpath +"/api/personal-position-educationExperience/"+id;
    wx.showModal({
      title: '是否删除',
      content: '您确定要删除吗？',
      success:function(res){
        if (res.confirm) {
          wx.request({
            url: path,
            data: {},
            method: 'DELETE', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'Authorization': app.getAuthorization(),
              'content-type': 'application/json',
              'access_token': app.getaccess_token()
            },
            // header: {}, // 设置请求的 header
            success: function (res) {
              // success
              if (res.statusCode == 200 || res.statusCode == 204) {
               wx.showToast({
                 title: '删除成功',
               })
                that.shwoData();
              } else if (res.statusCode == 401) {
                app.validToken();
                return;
              }
            },
            fail: function () {
              // fail
              toash('服务器异常');
            },
            complete: function () {
              // complete
            }
          })
        }
      }
    })
  },
  myClickTap: function (e) {
    var id = e.currentTarget.id

    wx.navigateTo({
      url: 'add?id=' + id
    })
  }
})