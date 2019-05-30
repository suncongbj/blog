var tcity = require('../../utils/citys.js')
var app = getApp()
Page({
  data: {
    id:'',
    workProperty: ['全职', '兼职'],//工作的性质列表
    workProperty_value: '',//工作性质结果

    liveRegion: [],//工作地点

    workPropertyStatus:['离职-随时到岗','在职-暂不考虑机会','在职-考虑机会','在职-月内到岗'],
    workPropertyStatus_value: '',

    salaryArray: ['面议', '1000以下', '1000~2000', '2000~4000', '4000~6000', '6000~8000', '8000~10000', '10000~15000', '15000~25000', '25000以上'],
    salaryValue: '',//薪资范围


    jobType:'',//职位类型
    jobType_show: false,
    jobType_list1: [],
    jobType_list2: [],
    jobType_list3: [],
    jobType_list_result1: '',
    jobType_list_result2: '',
    jobType_list_result3: '',


  },
  onLoad: function(options) {
    var id = options.id
    this.setData({
      id:id,
    })
    this.getBusiness()
  },
  onReady: function() {

  },
  onShow: function() {
    this.getDetail()
  },
  getDetail:function(){
    let self = this
    if (this.data.id != null && this.data.id != '' && this.data.id!='null'){
      var path = app.getpath + "/api/personal-position-jobIntention/" + this.data.id;
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
          if(res.statusCode == 200) {
            let detail = res.data
            let liveRegion_arr = [detail.workingProvince,detail.workingCity,detail.workingArea]
            let salary = ''
            if(detail.expectSalaryMin == 0 && detail.expectSalaryMax == 0) {
              salary = '面议'
            }else if(detail.expectSalaryMin == 0&&detail.expectSalaryMax == 1000) {
              salary = '1000以下'
            }else if(detail.expectSalaryMin == 25000) {
              salary = '25000以上'
            }else{
              salary = detail.expectSalaryMin + '~' + detail.expectSalaryMax
            }
            self.setData({
              workProperty_value: detail.workNature,
              liveRegion: liveRegion_arr,
              jobType_list_result1: detail.positionCategory1,
              jobType_list_result2: detail.positionCategory2,
              jobType_list_result3: detail.positionCategory3,
              workPropertyStatus_value: detail.jobStatus,
              salaryValue: salary
            })
          }else if (res.statusCode == 401) {
            app.validToken();
            return;
          }else {
            wx.showToast({
              title: res.data.message
            })
          }
        },
      })
    }
  },
  getBusiness:function() {//获取职位信息
    var self = this
    wx.request({
      url: app.getpath+'/api/admin-system-businessDicOne/all',
      method: 'GET',
      header: {
        'Authorization': app.globalData.token_type + " " + app.globalData.access_token,
        'content-type': 'application/json' // 默认值
      },
      data: {},
      success:function(res){
        self.setData({
          jobType_list1: res.data._embedded.businessDicOnes
        })
      },
      fail: function (error) {
        
      },
    })
  },
  bindRegionChange(e) {//地点
    this.setData({
      liveRegion: e.detail.value
    })
  },
  bindPickerChange: function(e) {//工作性质
    this.setData({
      workProperty_value: this.data.workProperty[e.detail.value]
    })
  },
  bindPickerChangeStatus: function (e) {//状态
    this.setData({
      workPropertyStatus_value: this.data.workPropertyStatus[e.detail.value]
    })
  },
  saveJobIntention:function(){
    let position = {}
    position.salaryValue = this.data.salaryValue
    if(position.salaryValue == '面议'){
      position.monthlyRangeMin = 0
      position.monthlyRangeMax = 0
    }else if(position.salaryValue == '1000以下'){
      position.monthlyRangeMin = 0
      position.monthlyRangeMax = 1000
    }else if(position.salaryValue == '25000以上') {
      position.monthlyRangeMin = 25000
      position.monthlyRangeMax = null
    }else{
      position.monthlyRangeMin = Number(position.salaryValue.split('~')[0])
      position.monthlyRangeMax = Number(position.salaryValue.split('~')[1])
    }

    var that = this;
    var path = app.getpath + '/api/personal-position-jobIntention'
    var data = {
      userid: app.getUserId(),
      workNature: this.data.workProperty_value,//工作性质
      workingProvince: this.data.liveRegion[0],//省
      workingCity: this.data.liveRegion[1],//市
      workingArea: this.data.liveRegion[2],//区
      jobStatus: this.data.workPropertyStatus_value,//工作状态
      expectSalaryMin: position.monthlyRangeMin,//小钱
      expectSalaryMax: position.monthlyRangeMax,//大钱
      positionCategory1: this.data.jobType_list_result1,//职位性质
      positionCategory2: this.data.jobType_list_result2,//职位性质
      positionCategory3: this.data.jobType_list_result3,//职位性质
    }
    var method = 'POST'
    if (this.data.id != null && this.data.id != '' && this.data.id != 'null'){
      path = app.getpath + '/api/personal-position-jobIntention/'+this.data.id
      data.id = this.data.id
      method = 'PUT'
    }
    wx.request({
      url: path,
      data: data,
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Authorization': app.getAuthorization(),
        'content-type': 'application/json',
        'access_token': app.getaccess_token()
      },
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        if(res.statusCode==204){
          wx.navigateBack({ changed: true });
        } else if (res.statusCode == 401) {
          app.validToken();
          return;
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器异常',
        })
      },
      complete: function () {
        // complete
      }
    })

  },
  salarySelect: function () {
    var that = this
    that.setData({
      salarySelectShow: !that.data.salarySelectShow,
    });
  },
  bindsalaryTap: function (e) {
    var that = this
    var num = e.detail.value
    console.log(e)
    that.setData({
      salarySelectShow: !that.data.salarySelectShow,
      salaryValue: that.data.salaryArray[num]
    });
  },
  hanldeType() {
    this.setData({
      jobType_show: !this.data.jobType_show
    })
  },
  hanldeType1(e) {
    this.setData({
      jobType_list2: e.currentTarget.dataset.detail.businessDicTwos,
      jobType_list_result1: e.currentTarget.dataset.detail.name
    })
  },
  hanldeType2(e) {
    this.setData({
      jobType_list3: e.currentTarget.dataset.detail.positionDics,
      jobType_list_result2: e.currentTarget.dataset.detail.name
    })
  },
  hanldeType3(e) {
    let str = e.currentTarget.dataset.detail.name
    console.log(str)
    this.setData({
      jobType_list_result3: str,
      jobType_show: !this.data.jobType_show,
      jobType_list3: [],
      jobType_list2: [],
    })
  },
})