//index.js
//获取应用实例
const app = getApp()
var pageSize = 20

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasMore: false
  },
  Newfun:function(){
    if(!wx.getStorageSync('enterpriseId')) {
      return wx.showToast({
        title: '请等待认证通过',
        icon: 'none'
      })
    }
    wx.navigateTo({
      url: '../positionadd/positionadd'
    })
 
  },
  onShow: function(){
    this.Getposition()
  },
  onLoad: function () {

  },
  handlerItem:function(e) {
    wx.showToast({
      title: '请前往app进行职位管理',
      icon: 'none'
,    })
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
        size:100,
       enterpriseId:enterpriseId,
       projection:'manage',
       sort:'lengthRecruitment,asc'
      }
    wx.request({
      ///api/enterprise-position-positionInfo?page=2&size=5&enterpriseId={企业 id}&projection=manage&sort=lengthRecruitment,asc
      //url: 'http://58.87.91.223:8083/api/enterprise-position-positionInfo', //仅为示例，并非真实的接口地址
        url: app.globalData.BaseUrl+'enterprise-position-positionInfo',
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
            jobdata[i].MRresult = jobdata[i].MRMin + '/' + jobdata[i].MRMax + '千'
            if(jobdata[i].MRMin == 0) {
              jobdata[i].MRresult = '面议/月'
            }
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
    }else{
      wx.showToast({
        title: '请等待认证通过',
        icon: 'none'
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
  },
  handlerVideo:function() {
    wx.showToast({
      title: '请前往app查看',
      icon: 'none'
    })
  }
})
