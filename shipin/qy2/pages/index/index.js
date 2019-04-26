

//index.js
//获取应用实例
const app = getApp()
const comfun=  require('./../../utils/comfun.js')
var pageSize = 20
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    jobs:[],
    hasUserInfo: false,
    hasMore: true,
    showLoading: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {

    var _this=this;
    var enterpriseId = wx.getStorageSync('enterpriseId') || ''
    if(!!enterpriseId){
      var data={
        page:1,
        pageSize:5,
        enterpriseId:enterpriseId,
        sort:'lengthRecruitment,asc'
      }
      wx.request({
        url: 'http://www.shipinzp.com/api/enterprise-position-positionInfo', //仅为示例，并非真实的接口地址
        method: 'Get',
        data: data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res);
          _this.jobs=  res.data._embedded.positionInfoes;
          pageSize=res.data.page.size
          _this.setData({
            hasMore: false,
          })
          _this.setData({
            showLoading: false
          })
          debugger;
       //   wx.hideLoading();
        //  resolve(res.data)
        },
        fail: function (error) {
       //   wx.hideLoading();
          reject(false)
        },
        complete: function () {
        //  wx.hideLoading();
        }
      })
    }
  
   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  scroll: function(e){
    //console.log(e)
  },
  scrolltolower: function(){
    var that = this
    // functions.getCity(function(city){
    //   functions.fetchFilms.call(that, url, city, that.data.start, pageSize, function(data){ })
    // })
  },
  viewDetail: function(e){
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?id=' + ds.id + '&title=' + ds.title + '&type=ing'
    })
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
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
