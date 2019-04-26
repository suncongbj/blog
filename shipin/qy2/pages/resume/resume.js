//index.js
//获取应用实例
const app = getApp()
var pageSize = 20

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  Newfun:function(){ 
    wx.navigateTo({
      url: '../positionadd/positionadd'
    })
 
  },
  onShow: function(){
    this.Getposition()
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  handlerItem:function(e) {
    console.log(e.currentTarget)
  },
  deleteItem:function(e) {
    console.log(e.currentTarget)
  },
  Getposition:function(){
    
    var _this=this;
    var enterpriseId = wx.getStorageSync('enterpriseId') || ''
    if(!!enterpriseId){
      var data={
        page:1,
        size:10,
       enterpriseId:enterpriseId,
       projection:'manage',
       sort:'lengthRecruitment,asc'
      }
    wx.request({
      ///api/enterprise-position-positionInfo?page=2&size=5&enterpriseId={企业 id}&projection=manage&sort=lengthRecruitment,asc
      //url: 'http://58.87.91.223:8083/api/enterprise-position-positionInfo', //仅为示例，并非真实的接口地址
        url:'http://www.shipinzp.com/api/enterprise-position-positionInfo',
        method: 'Get',
        data: data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          var jobdata=res.data._embedded.positionInfoes
          for(var i=0;i<jobdata.length;i++){
            jobdata[i].MRMin= jobdata[i].monthlyRangeMin/1000
            jobdata[i].MRMax= jobdata[i].monthlyRangeMax/1000
            if(!!jobdata[i].workingPlaces[0]){
              jobdata[i].Wp=jobdata[i].workingPlaces[0].province+jobdata[i].workingPlaces[0].city+jobdata[i].workingPlaces[0].county;
            }
           
          }
          _this.setData({
            recommends:jobdata
          })
      
          pageSize=res.data.page.size
          _this.setData({
            hasMore: false,
          })
          _this.setData({
            showLoading: false
          })
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
