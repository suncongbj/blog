var app = getApp();


Page({
  data: {
    loginBtnTxt: " 下一步",
    loginBtnBgBgColor: "#FDD000",
    btnLoading: false,
    disabled: false,
    inputUserName: '',
    inputPassword: '',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  formSubmit: function (e) {
    var param = e.detail.value;
    this.mysubmit(param);
  },
  mysubmit: function (param) {
    this.setLoginData1();

  },
  setLoginData1: function () {
    this.setData({
      loginBtnTxt: "认证中",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
    var that = this;
    var phone = this.data.inputUserName;
    var password = this.data.inputPassword;
    if (phone == null || phone == '' || password == null || password==''){
      wx.showToast({
        title: '姓名和身份证号必填',
      })
      return;
    }
    var path = app.getpath + "/api/personal-user-perSonalUserCer";
    wx.request({
      url: path,
      data: {
        name: phone,
        idCard: password,
        userid: app.getUserId()
      },
      header: {
        'Authorization': app.getAuthorization(),
        'content-type': 'application/json',
        'access_token': app.getaccess_token()
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log("认证信息")
        console.log(res)
        if (res.statusCode == 201 || res.statusCode == 200) {
          wx.showToast({
            title: '认证成功',
          })
          wx.redirectTo({
            url: '../guide/guide'//参数只能是字符串形式，不能为json对象
          })
        } else if (res.statusCode == 401) {
          app.validToken();
          return;
        }else {
          wx.showToast({
            title: '认证失败',
          })
        }
      },
      fail: function () {
        // fail
        console.log('register fail')
        that.setLoginData2();
      },
      complete: function () {
        console.log('register complete')
      }
    })


  },
  setLoginData2: function () {
    this.setData({
      loginBtnTxt: "认证",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#ff9900",
      btnLoading: !this.data.btnLoading
    });
  },
 
   
  getPhone: function (e) {
    this.setData({
      inputUserName: e.detail.value
    })
  },
  getpwd: function (e) {
    this.setData({
      inputPassword: e.detail.value
    })
  }

})