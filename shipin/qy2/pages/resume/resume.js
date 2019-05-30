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
          let workingAge
          for(var i=0;i<jobdata.length;i++){
            if(jobdata[i].workingLifeMin == null){
              workingAge = '不限'
            }else if(jobdata[i].workingLifeMin == '-1'){
              workingAge = '应届'
            }else if(jobdata[i].workingLifeMin == '0'){
              workingAge = '往届'
            }else if(jobdata[i].workingLifeMin == '1'){
              workingAge = '1-3年经验'
            }else if(jobdata[i].workingLifeMin == '3'){
              if(jobdata[i].workingLifeMax == '5'){
                workingAge = '3-5年经验'
              }else{
                workingAge = '5年以上'
              }
            }
            jobdata[i].workingAge = workingAge
            jobdata[i].MRMin= jobdata[i].monthlyRangeMin
            jobdata[i].MRMax= jobdata[i].monthlyRangeMax
            jobdata[i].MRresult = jobdata[i].MRMin + '-' + jobdata[i].MRMax + '/月'
            if(jobdata[i].MRMin == 0 && jobdata[i].MRMax == 0) {
              jobdata[i].MRresult = '面议/月'
            }else if(jobdata[i].MRMin == 0&&jobdata[i].MRMax == 1000) {
              jobdata[i].MRresult = '1000以下/月'
            }else if(jobdata[i].MRMin == 25000) {
              jobdata[i].MRresult = '25000以上/月'
            }
            if(!!jobdata[i].workingPlaces[0]){
              jobdata[i].Wp=jobdata[i].workingPlaces[0].province+jobdata[i].workingPlaces[0].city+jobdata[i].workingPlaces[0].county;
            }
            jobdata[i].lengthRecruitment = jobdata[i].lengthRecruitment.substr(5,2) + '月' + jobdata[i].lengthRecruitment.substr(8,2) + '日'
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
