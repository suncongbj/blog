var app = getApp();
var path = app.getpath + "/api/personal-position-projectExperience";

Page({
  data: {
    projectName: "",
    projectDescription: "",
    beginDate: "", // 任职开始日期
    endDate: "", // 任职结束日期
    obligation: "", // 工作描述
	id:''
  },

  bindDateBegin: function (e) {
    var that = this;
    that.setData({
      beginDate: e.detail.value
    })
  },

  bindDateEnd: function (e) {
    var that = this;
    that.setData({
      endDate: e.detail.value
    })

  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
   if(options.id!=undefined){
     this.setData({
       id: options.id
     })
    
   }
    

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.showData()
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  getprojectName: function (e) {
    this.setData({
      projectName: e.detail.value
    })
  },
  getprojectDescription: function (e) {
    this.setData({
      projectDescription: e.detail.value
    })
  },
  getobligation: function (e) {
    this.setData({
      obligation: e.detail.value
    })
  },
  submitInfo: function () {
    var that = this
    if (this.data.projectName == null || this.data.projectName==''|| this.data.projectName.indexOf(' ')!==-1){
      this.showMessage("提示","项目名称输入有误，请重新输入")
      return
    }
    if (this.data.projectDescription == null || this.data.projectDescription == '') {
      this.showMessage("提示", "项目描述不能为空")
      return
    }
    if (this.data.obligation == null || this.data.obligation == '') {
      this.showMessage("提示", "个人职责不能为空")
      return
    }
    if (this.data.beginDate == null || this.data.beginDate == '') {
      this.showMessage("提示", "开始时间不能为空")
      return
    }
    if(new Date(this.data.beginDate)>=new Date(this.data.endDate)) {
      return this.showMessage('提示','项目时间有误，请重新选择')
    }

    var data = {
      userId: app.getUserId(),
      projectName: this.data.projectName,
      projectDescription: this.data.projectDescription,
      obligation: this.data.obligation,
      projectTimeStart: new Date(this.data.beginDate),
      projectTimeStop: new Date(this.data.endDate),
    }

    var method = "POST"

    if (this.data.id != undefined && this.data.id != null && this.data.id != '') {
      method = "PUT"
      path = app.getpath + "/api/personal-position-projectExperience/" + this.data.id
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
        if (res.statusCode == 200 || res.statusCode == 201|| res.statusCode == 204) {
          wx.showToast({
            title: '添加成功',
          })
          wx.navigateBack({ changed: true });
        } else if (res.statusCode == 401) {
          app.validToken();
          return;
        }
      },
      fail: function (e) {
        // fail
        var msg = '服务器异常'
        if (e.errMsg == 'request:fail method is invalid') {
          msg = '不支持PATCH请求'
        }
        wx.showToast({
          title: msg,
        })
      },
      complete: function () {
        // complete
      }
    })
  },
  showMessage:function(title,content){
    wx.showModal({
      title: title,
      content: content,
      showCancel:false
    })
  },
  showData: function () {
    var id = this.data.id
    if (id == undefined || id == null || id == '') {
      return;
    }
    var that = this
    var path = app.getpath + "/api/personal-position-projectExperience/" + id;
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
        if (res.statusCode == 401) {
          app.validToken();
          return;
        }
        if (res.statusCode == 200) {
          var recruitment = res.data.recruitment

          that.setData({
            projectName: res.data.projectName,
            beginDate: app.date_time_formart(res.data.projectTimeStart, 'day'),
            endDate: app.date_time_formart(res.data.projectTimeStop, 'day'),
            obligation: res.data.obligation,
            projectDescription: res.data.projectDescription
          })

        } else {
          wx.showToast({
            title: '获取失败',
          })
          wx.navigateBack({ changed: true });
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