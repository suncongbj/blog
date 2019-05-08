// pages/jobDetail/main.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightimg: '/images/jian_r.png',
    dataDatils: '',
    id:"",
    isapply:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
     this.setData({
       id:id
     })
    this.getData(id);
  },
  getData:function(id){
    var that = this; 
    var path = app.getpath + '/api/enterprise-position-positionInfo/'+id+'?projection=info';
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
        console.log("职称详情返回",res)
        if (res.data.status==500){
          wx.showModal({
            title: '服务器异常',
            content: '服务器请求返回500',
            success:function(res){
              if(res.confirm){
                wx.navigateBack({ changed: true });
              } 
            
            }
          })
        
        } else if (res.statusCode == 401) {
          app.validToken();
          return;
        }

        var element = res.data
        element.city = element.city == null ? "未知" : element.city 
        element.workingLife = element.workingLife == null ? "" : element.workingLife 
        element.minimumEducational = element.minimumEducational == null ? "" : element.minimumEducational
        if (element.monthlyRangeMin == null) {
          element.salar = "面议"
        } else {
          if (element.monthlyRangeMax == null) {
            element.salar = element.monthlyRangeMin + "以上/月"
          } else {
            element.salar = element.monthlyRangeMin + "~" + element.monthlyRangeMax + "/月"
          }
        }
        that.setData({
          dataDatils: element
        });
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var flag = wx.getStorageSync(this.data.id + "@" + app.getUserId());
    if(flag){
      this.setData({
        isapply:true
      })
    }
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
  phoneCall:function(e) {//打电话
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.num
    })
  },
  applypos:function(){
    var path = app.getpath + "/api/unified-history-positionDelivery";
    var that = this;
    
    wx.request({
      url: path,
      data: {
        positionId:that.data.id,
        userId: app.getUserId()
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Authorization': app.getAuthorization(),
        'content-type': 'application/json',
        'access_token': app.getaccess_token()
      },
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.statusCode==200){
          that.setData({
            isapply: true
          })
          wx.showToast({
            title: '申请成功',
          })
          wx.setStorageSync(that.data.id + "@" + app.getUserId(), true);
        } else if (res.statusCode == 401) {
          app.validToken();
          return;
        }else{
          wx.showToast({
            title: '申请失败',
          })
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
})