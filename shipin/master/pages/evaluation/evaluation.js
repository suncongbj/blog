var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reason_input:'',
    evaluation:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.setData({
      id: options.id
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
    this.getDetail()
  }, 
  getDetail: function () {
    if (this.data.id == null || this.data.id == '' || this.data.id=='null'){
      return;
    }
    var that = this
    var path = app.getpath + "/api/personal-position-selfAssessment/" + this.data.id;
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
        console.log("详情返回", res)
        if(res.statusCode==200){
            that.setData({
              
              reason_input: res.data.selfAssessment,
              evaluation: res.data.selfAssessment,
            })
        } else if (res.statusCode == 401) {
          app.validToken();
          return;
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '服务器异常',
        }) 
      },
      complete: function () {
        // complete
      }
    })

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
  bindinput:function(e){
    this.setData({
      reason_input: e.detail.value
    });
  },
  sumbit:function(){
     var method = 'POST'
    var path = app.getpath + "/api/personal-position-selfAssessment"
    var that= this
    if (this.data.id != null && this.data.id != '' && this.data.id != 'null') {
      method = 'PATCH'
      path = app.getpath + "/api/personal-position-selfAssessment/"+this.data.id
    }
    wx.request({
      url: path,
      data: {
        userId: app.getUserId(),
        selfAssessment: that.data.reason_input
      },
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Authorization': app.getAuthorization(),
        'content-type': 'application/json',
        'access_token': app.getaccess_token()
      },
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log("==返回", res)
        if (res.statusCode == 201 || res.statusCode == 200) {
          wx.navigateBack({ changed: true });
        } else if (res.statusCode == 401) {
          app.validToken();
          return;
        }
      },
      fail: function (e) {
        // fail
        var mess = "服务器异常"
        if (e.errMsg =='request:fail method is invalid'){
          mess = "不支持PATCH请求"
        }
        wx.showToast({
          title: mess,
        }) 
      },
      complete: function () {
        // complete
      }
    })

  }
})