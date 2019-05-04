//添加工作经历
var app = getApp();
var path = app.getpath + "/api/personal-position-workExperience";

Page({
  data:{
    companyName : "",
    industry : "", //  
    jobTitle:"",
    jobCategory:"",
    salary : "",
    beginDate : "", // 任职开始日期
    endDate : "", // 任职结束日期
    jobDescription : "", // 工作描述,
    id:""
  },

  bindDateBegin: function(e) {
    console.log(e.detail.value)
    var that = this;
    that.setData({
      beginDate: e.detail.value
    })
  },

  bindDateEnd: function(e) {
    var that = this;
    that.setData({
      endDate: e.detail.value
    })
   
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id
    if(id!=undefined){
      this.setData({
        id: id
      })
    }
    

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    this.showData()
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  getcompanyName:function(e){
    this.setData({
      companyName: e.detail.value
    })
  },
  getindustry: function (e) {
    this.setData({
      industry: e.detail.value
    })
  },
  getjobCategory: function (e) {
    this.setData({
      jobCategory: e.detail.value
    })
  },
  getjobTitle: function (e) {
    this.setData({
      jobTitle: e.detail.value
    })
  },
  getsalary: function (e) {
    this.setData({
      salary: e.detail.value
    })
  },
  getjobDescription: function (e) {
    this.setData({
      jobDescription: e.detail.value
    })
  },
  submitInfo:function(){
    var that = this
    var data = {
      userId:app.getUserId(),
      id: this.data.id,
      companyName: this.data.companyName,
      industry: this.data.industry,
      jobTitle: this.data.jobTitle,
      salary: this.data.salary,
      jobCategory: this.data.jobCategory,
      jobDescription: this.data.jobDescription,
      workingTimeStart: new Date(this.data.beginDate),
      workingTimeStop: new Date(this.data.endDate),
    }

    var id = this.data.id 
    var method = "POST"
    if(id){
      path = app.getpath + "/api/personal-position-workExperience/"+id;
      method = "PUT"
    }

    wx.request({
      url: path,
      data: data,
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        'Authorization': app.getAuthorization(),
        'content-type': 'application/json',
        'access_token': app.getaccess_token()
      },
      success: function (res) {
        console.log(res)
        if(res.data.statusCode == 400){
          wx.showToast({
            title: res.errors[0].message,
          })
        }
        if (res.statusCode == 401) {
          app.validToken();
          return;
        } else if (res.statusCode == 404) {
          wx.showToast({
            title: '不支持PATCH请求',
          })
        }else{
          wx.showToast({
            title: '操作成功',
          })
          wx.navigateBack({ changed: true });
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  showData:function(){
    var id = this.data.id
    if(id==null||id==""||id==undefined){
      return;
    }
    var that = this;

    wx.request({
      url: app.getpath + "/api/personal-position-workExperience/"+id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        'Authorization': app.getAuthorization(),
        'content-type': 'application/json',
        'access_token': app.getaccess_token()
      },
      success: function (res) {
        console.log("获取到的数据",res)
        if (res.statusCode == 200 || res.statusCode == 201) {
          that.setData({
            companyName: res.data.companyName,
            industry: res.data.industry,
            jobTitle: res.data.jobTitle,
            jobCategory: res.data.jobCategory,
            salary: res.data.salary,
            jobDescription: res.data.jobDescription,
            beginDate: app.date_time_formart(res.data.workingTimeStart,'day'),
            endDate: app.date_time_formart(res.data.workingTimeStop, 'day')
          })
         
        } else if (res.statusCode == 401) {
          app.validToken();
          return;
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  }
})