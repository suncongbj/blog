//index.js
//获取应用实例
const app = getApp()
var pageSize = 20
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    recommends: [],
    hasUserInfo: false,
    hasMore: true,
    searchKey: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    page: 1,

    searchIng: false,
  },
  stopSearch() {
    this.setData({
      page: 1,
      searchIng: false,
      recommends: [],
      searchKey: ''
    })
    this.queryBooks()
  },
  doSearch() {
    if(!this.data.searchKey) {
      return wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
    }
    this.setData({
      recommends: [],
      searchIng: true,
      page: 1
    })
    this.queryBooks()
  },
  queryBooks: function () {
    var _this = this;
    var enterpriseId = wx.getStorageSync('enterpriseId') || ''
    let url = this.searchIng?'http://shipinzp.com/api/personal-search/resume':'http://shipinzp.com/api/personal-search/recommend'
    var data = {
      keyword: this.data.searchKey,
      page: _this.data.page,
      size: 30,
    }
    wx.request({
      url: url,
      method: 'Get',
      data: data,
      header: {
        'Authorization': app.globalData.token_type + " " + app.globalData.access_token,
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (!!res.data && !!res.data._embedded) {
          if(res.data.page.totalPages == _this.data.page||res.data.page.totalElements==0) {
            _this.setData({
              hasMore: false,
            })
            console.log(_this.data.hasMore)
          }else{
            _this.setData({
              hasMore: true,
            })
          }
          var jobdata = res.data._embedded.resumeListInfoes
          for (let i = 0; i < jobdata.length;i++) {
            jobdata[i].MRMin= jobdata[i].expectSalaryMin
            jobdata[i].MRMax= jobdata[i].expectSalaryMax
            jobdata[i].MRresult = jobdata[i].MRMin + '-' + jobdata[i].MRMax + '千'
            if(jobdata[i].MRMin == 0 && jobdata[i].MRMax == 0) {
              jobdata[i].MRresult = '面议/月'
            }else if(jobdata[i].MRMin == 0&&jobdata[i].MRMax == 1000) {
              jobdata[i].MRresult = '一千以下/月'
            }else if(jobdata[i].MRMin == 25000) {
              jobdata[i].MRresult = '25000以上/月'
            }
            jobdata[i].birthDate = parseInt((new Date() - jobdata[i].birthDate)/1000/60/60/24/365)
          }
          var new_list = _this.data.recommends.concat(jobdata)
          _this.setData({
            recommends: new_list
          })
          var new_page = ++_this.data.page
          _this.setData({
            page: new_page
          })
        }
      },
      fail: function (error) {
        
        reject(false)
      },
      complete: function () {
        
      }
    })
  },
  keyinputChange: function (e) {

    this.setData({
      searchKey: e.detail.value
    })
  },
  onLoad: function () {
    this.queryBooks();
  },
  scroll: function (e) {
    
  },
  scrolltolower: function () {
      this.queryBooks()
  },
  handlerItem: function(e) {//选中求职者
    var id = e.currentTarget.dataset.type.id
    wx.navigateTo({
      url: './detail?id='+e.currentTarget.dataset.type.id
    })
  }
})