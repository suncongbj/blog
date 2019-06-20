const app = getApp()
const receiveResume = app.globalData.BaseUrl + 'unified-history-positionDelivery/receiveResume'//?page=1&size=10
Page({
  data: {
    recommends: [],
    hasUserInfo: false,
    hasMore: true,
    page: 1,
  },
  onLoad: function () {
    this.queryBooks()
  },
  queryBooks: function () {
    var _this = this;
    var data = {
      page: _this.data.page,
      size: 30,
    }
    wx.request({
      url: receiveResume,
      method: 'GET',
      data: data,
      header: {
        'Authorization': app.globalData.token_type + " " + app.globalData.access_token,
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (!!res.data && !!res.data._embedded) {
          if(res.data.page.totalPages == _this.data.page || res.data.page.totalElements == 0) {
            _this.setData({
              hasMore: false,
            })
            console.log(_this.data.hasMore)
          }else{
            _this.setData({
              hasMore: true,
            })
          }
          var jobdata = res.data._embedded.deliveryListInfoes
          for (let i = 0; i < jobdata.length;i++) {
            if(jobdata[i].expectSalaryMin == 0){
              jobdata[i].expectSalaryMin ='面议'
            }else{
              jobdata[i].expectSalaryMin = jobdata[i].expectSalaryMin +'-'+jobdata[i].expectSalaryMax
            }
          }
          var new_list = _this.data.recommends.concat(jobdata)
          _this.setData({
            recommends: new_list
          })
          var new_page = ++_this.data.page
          _this.setData({
            page: new_page
          })
        }else{
          _this.setData({
              hasMore: false,
            })
        }
      },
      fail: function (error) {},
      complete: function () {}
    })
  },
  handlerItem:function(e) {
    console.log(e)
  }
})
