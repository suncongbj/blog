const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobName: "",//职位名称
    jobDesc: "",//职位描述
    job_dy: "", // 职位待遇,
    workAge: ['1年以下', '1-2年', '2-3年', '3-5年', '5-10年','无要求'],
    workAgeSelectShow:true,
    workAgeValue:'', //工作年限

    xueliArray: ['小学', '初中', '高中', '专科', '本科', '硕士', '博士', '博士后'],
    xueliSelectShow: true,
    xueliValue: '',//学历
    jobNum:'',  //招聘人数
    jobAddress:'',//详细地址

    salaryArray: ['面议', '1000~2000', '2000~5000', '5000~10000', '10000~15000', '15000~20000', '20000~25000', '25000'],
    salarySelectShow: true,
    salaryValue: '',//薪资范围

    jobType:'',//职位类型
    jobCity:'',//上班地点
    jobXz:'',//职位性质

    id:''
  },
// /api/enterprise-position-positionInfo      POST新增
// /api/enterprise-position-positionInfo      PUT全量更新
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.id) {
      this.setData({
        id: options.id
      })
      this.getPositionDetail()
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getPositionDetail() {
    var self = this
    wx.showLoading({
      title: '正在获取职位详情...'
    })
    wx.request({
      url: app.globalData.BaseUrl+'enterprise-position-positionInfo',
      method: 'GET',
      header: {
        'Authorization': app.globalData.token_type + " " + app.globalData.access_token,
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: this.data.id,
      },
      success:function(res){
        console.log(res.data._embedded.positionInfoes[0])
        wx.hideLoading()
      },
      fail: function (error) {
        wx.hideLoading()
        wx.showToast({
          title: error,
          icon: 'none'
        })
      },
    })
  },
  submitInfo:function(){
    //保存操作
    var position = {}
    position.jobName = this.data.jobName
    position.workAgeValue = this.data.workAgeValue
    position.xueliValue = this.data.xueliValue
    position.jobNum = this.data.jobNum
    position.jobAddress = this.data.jobAddress
    position.salaryValue = this.data.salaryValue
    position.jobType = this.data.jobType
    position.jobCity = this.data.jobCity
    position.jobXz = this.data.jobXz
    for(var i in position) {
      if(position[i] == '' ) {
        return wx.showToast({
          title: '请完善必填选项',
          icon: 'none',
        })
      }
    }
    if(position.salaryValue == '面议'){
      position.monthlyRangeMin = 0
      position.monthlyRangeMax = 0
    }else{
      position.monthlyRangeMin = Number(position.salaryValue.split('~')[0])
      position.monthlyRangeMax = Number(position.salaryValue.split('~')[1])
    }
    if(position.workAgeValue == '1年以下') {
      position.workingLifeMin = 0
      position.workingLifeMax = 1
    }else if(position.workAgeValue == '无要求') {
      position.workingLifeMin = 0 
      position.workingLifeMax = 0
    }else{
      position.workingLifeMin = Number(position.workAgeValue.split('-')[0])
      var max_str = position.workAgeValue.split('-')[1]
      position.workingLifeMax = Number(max_str.substring(0,max_str.length-1))
    }
    position.workingPlaces = [{
      province: '',
      city: '',
      county: '',
      address: this.data.jobAddress,
      longitude: 0,
      latitude: 0,
    }]
    console.log("本次被保存的对象是：",position)
    var method = this.data.id ? 'PUT' : 'POST'
    wx.request({
      url: app.globalData.BaseUrl+'enterprise-position-positionInfo',
      method: method,
      header: {
        'Authorization': app.globalData.token_type + " " + app.globalData.access_token,
        'content-type': 'application/json' // 默认值
      },
      data: {
        enterpriseId: wx.getStorageSync('enterpriseId'),
        id: this.data.id,//职位id
        releaseMode: 'GeneralRelease',//发布方式
        positionName: position.jobName,//职位名称
        sex: '',
        positionNature: position.jobType,//职位性质
        monthlyRangeMin: 0,//最小月薪转数字
        monthlyRangeMax: 0,//最大月薪转数字
        minimumEducational: position.xueliValue,//学历要求
        workingLifeMin: position.workingLifeMin,//工作年限转数字
        workingLifeMax: position.workingLifeMax,//工作年限转数字
        jobDescription: this.data.jobDesc,//职位描述
        jobHighlights: this.data.job_by,
        workingPlaces: position.workingPlaces
      },
      success: function (res) {
        if(res.statusCode == 200 ||res.statusCode == 201) {
          self.setData({
            step: 1
          })
        }else {
          wx.showToast({
          title: res.errMsg,
          icon: 'none'
        })
      }
      },
      fail: function (error) {
        wx.showToast({
          title: error,
          icon: 'none'
        })
      },
    })
  },
  getJobDy: function (e) {
    this.setData({
      job_dy: e.detail.value
    })
  },
  getJobDesc: function (e) {
    this.setData({
      jobDesc: e.detail.value
    })
  },
  getJobName: function (e) {
    this.setData({
      jobName: e.detail.value
    })
  },
  getJobAddress: function (e) {
    this.setData({
      jobAddress: e.detail.value
    })
  },
  getjobType: function (e) {
    this.setData({
      jobType: e.detail.value
    })
  },
  getjobCity: function (e) {
    this.setData({
      jobCity: e.detail.value
    })
  },
  getjobXz: function (e) {
    this.setData({
      jobXz: e.detail.value
    })
  },
  
  getJobNum: function (e) {
    var regNum = new RegExp('[0-9]', 'g');
    var value = e.detail.value
    var rsNum = regNum.exec(value);
    if (rsNum == null || rsNum==''){
      value = ""
    }

    this.setData({
      jobNum: value
    })
  },
  workAgeSelect:function(){
    var that = this
    that.setData({
      workAgeSelectShow: !that.data.workAgeSelectShow,
    });
  },
  bindWorkAgeTap: function (e) {
    var that = this
    var num = e.currentTarget.dataset.id;
    that.setData({
      workAgeSelectShow: !that.data.workAgeSelectShow,
      workAgeValue: e.currentTarget.dataset.name
    });
  },
  xueliSelect: function () {
    var that = this
    that.setData({
      xueliSelectShow: !that.data.xueliSelectShow,
    });
  },
  bindxueliTap: function (e) {
    var that = this
    var num = e.currentTarget.dataset.id;
    that.setData({
      xueliSelectShow: !that.data.xueliSelectShow,
      xueliValue: e.currentTarget.dataset.name
    });
  },
  salarySelect: function () {
    var that = this
    that.setData({
      salarySelectShow: !that.data.salarySelectShow,
    });
  },
  bindsalaryTap: function (e) {
    var that = this
    var num = e.currentTarget.dataset.id;
    that.setData({
      salarySelectShow: !that.data.salarySelectShow,
      salaryValue: e.currentTarget.dataset.name
    });
  },
})