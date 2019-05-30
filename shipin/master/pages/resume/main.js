// pages/resume/main.js
var app = getApp();
var myResume_path = app.getpath +"/api/personal-user-perSonalUser/resume/";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeInfo:null,
    jobIntentionNotEmpty: "待完善",//求职意向
    workExperienceNotEmpty: "待完善",//工作经历
    educationNotEmpty: "待完善",//教育背景
    projectNotEmpty: "待完善",//项目经验
    evaluationNotEmpty: "待完善",//自我评价
    user_name: '',
    user_avatar: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.validLogin();
    this.showMyResume();
    
  },
  getUserInfo: function (e) {
    e.detail.userInfo.name = e.detail.userInfo.nickName
    wx.setStorageSync('user_name',e.detail.userInfo.name)
    wx.setStorageSync('user_avatar',e.detail.userInfo.avatarUrl)
    this.setData({
      user_name: e.detail.userInfo.name,
      user_avatar: e.detail.userInfo.avatarUrl,
      hasUserInfo: true
    })
  },
  showMyResume:function(){
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
        if (res.statusCode== 200) {
          var obj = res.data;
          if(wx.getStorageSync('user_name')&&wx.getStorageSync('user_avatar')){
            that.setData({
              user_name: wx.getStorageSync('user_name'),
              user_avatar: wx.getStorageSync('user_avatar'),
              hasUserInfo: true
            })
          }else{
            if(obj.name&&obj.avatarUrl) {
              wx.setStorageSync('user_name',obj.name)
              wx.setStorageSync('user_avatar',obj.avatarUrl)
              that.setData({
                user_name: obj.name,
                user_avatar: obj.avatarUrl,
                hasUserInfo: true
              })
            }
          }
          that.setData({
            resumeInfo: obj,
            jobIntentionNotEmpty: obj.jobIntentionNotEmpty?"完整":"待完善",
            workExperienceNotEmpty: obj.workExperienceNotEmpty ? "完整" : "待完善",
            educationNotEmpty: obj.educationNotEmpty ? "完整" : "待完善",
            projectNotEmpty: obj.projectNotEmpty ? "完整" : "待完善",
            evaluationNotEmpty: obj.evaluationNotEmpty ? "完整" : "待完善",
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
  goPage:function(e){
    var select = e.currentTarget.id
    if(select==1){
      wx.navigateTo({
        url: '../jobIntention/jobIntention?id=' + this.data.resumeInfo.jobIntentionId,
      })
    } else if (select == 5) {
      wx.navigateTo({
        url: '../evaluation/evaluation?id=' + this.data.resumeInfo.evaluationId,
      })
    } else if (select == 3) {
      wx.navigateTo({
        url: '../educationbg/educationbg',
      })
    } else if (select == 2) {
      wx.navigateTo({
        url: '../workbj/workbj',
      })
    } else if (select == 4) {
      wx.navigateTo({
        url: '../projectbj/projectbj',
      })
    }
  } 
})