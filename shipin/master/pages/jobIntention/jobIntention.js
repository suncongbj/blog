var tcity = require('../../utils/citys.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    workProperty: ['全职', '兼职'],
    index: 0,
    indexStatus:0,
    workPropertyStatus:['在职','离职'],
    indexSalary:0,
    salaryProperty:['0~2000','2000~5000','5000~10000','10000~15000','15000以上'],
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    condition: false,
    values: [0, 0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    console.log("id = ",id)
  
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];
    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    that.setData({
      id:id,
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getDetail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  getDetail:function(){
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
          // success
          console.log("详情返回", res)
           if(res.statusCode == 401) {
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

    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChangeStatus: function (e) {
    this.setData({
      indexStatus: e.detail.value
    })
  },
  bindPickerChangeSalary: function (e) {
    this.setData({
      indexSalary: e.detail.value
    })
  },

  
  bindChange: function(e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;



    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];



      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }



      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })



      
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];



      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }



      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }




  },
  open: function() {
    this.setData({
      condition: !this.data.condition
    })

  },
  
  saveJobIntention:function(){
    var workNature = this.data.workProperty[this.data.index];
    var workingProvince = this.data.province
    var workingCity = this.data.city
    var workingArea = this.data.county
    var jobStatus = this.data.workPropertyStatus[this.data.indexStatus]
    
    var expectSalaryMin = 0;
    var expectSalaryMax = 0;
    if (this.data.indexSalary==0){
      expectSalaryMax = 2000
    } else if (this.data.indexSalary == 0) {
      expectSalaryMin = 2000
      expectSalaryMax = 5000
    } else if (this.data.indexSalary == 0) {
      expectSalaryMin = 5000
      expectSalaryMax = 10000
    } else if (this.data.indexSalary == 0) {
      expectSalaryMin = 15000
      expectSalaryMax = 100000
    }

    var that = this;
    var path = app.getpath + '/api/personal-position-jobIntention'
    var data = {
      userid: app.getUserId(),
      workNature: workNature,
      workingProvince: workingProvince,
      workingCity: workingCity,
      workingArea: workingArea,
      jobStatus: jobStatus,
      expectSalaryMin: expectSalaryMin,
      expectSalaryMax: expectSalaryMax
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
        console.log("详情返回", res)
        if(res.statusCode==200){
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

  }
})