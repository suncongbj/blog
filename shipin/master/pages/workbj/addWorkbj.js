//添加工作经历
var app = getApp();
var path = app.getpath + "/api/personal-position-workExperience";

Page({
  data:{
    companyName : "",
    industry : "", //  
    jobTitle:"",
    jobCategory:"",
    salary : "",//薪资
    beginDate : "", // 任职开始日期
    endDate : "", // 任职结束日期
    jobDescription : "", // 工作描述,
    id:"",

    jobType:'',//职位类型
    jobType_show: false,
    jobType_list1: [],
    jobType_list2: [],
    jobType_list3: [],
    jobType_list_result1: '',
    jobType_list_result2: '',
    jobType_list_result3: '',
  },

  bindDateBegin: function(e) {
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
      wx.setNavigationBarTitle({
        title: '编辑工作经历' 
      })
    }
    this.getBusiness()
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
  getBusiness:function() {//获取职位信息
    var self = this
    wx.showLoading()
    wx.request({
      url: app.getpath+'/api/admin-system-businessDicOne/all',
      method: 'GET',
      header: {
        'Authorization': app.globalData.token_type + " " + app.globalData.access_token,
        'content-type': 'application/json' // 默认值
      },
      data: {},
      success:function(res){
        wx.hideLoading()
        self.setData({
          jobType_list1: res.data._embedded.businessDicOnes
        })
      },
      fail: function (error) {
        
      },
    })
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
    if(!this.data.companyName||this.data.companyName.indexOf(' ')!=-1) return wx.showToast({
      title: '公司名称输入有误请重新输入',
      icon: 'none'
    })
    if(new Date(this.data.beginDate)>=new Date(this.data.endDate)) return wx.showToast({
      title: '任职开始时间不能大于结束时间',
      icon: 'none'
    })
    if(!this.data.jobType_list_result3) return wx.showToast({
      title: '请选择岗位名称',
      icon: 'none'
    })
    var data = {
      userId:app.getUserId(),
      id: this.data.id,
      companyName: this.data.companyName,
      industry: this.data.jobType_list_result1,//行业
      jobCategory: this.data.jobType_list_result2,//类别
      jobTitle: this.data.jobType_list_result3,//名称
      salary: Number(this.data.salary),
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
        if(res.data.statusCode == 400){
          wx.showToast({
            title: res.errors[0].message,
          })
          return
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
        if (res.statusCode == 200 || res.statusCode == 201) {
          that.setData({
            companyName: res.data.companyName,
            jobType_list_result1: res.data.industry,
            jobType_list_result3: res.data.jobTitle,
            jobType_list_result2: res.data.jobCategory,
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