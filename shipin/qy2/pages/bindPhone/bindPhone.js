var app = getApp();
var message_path = app.globalData.BaseUrl + 'sms-code/send';
var vaild_code_path = app.globalData.BaseUrl +'sms-code/check';
var register_path = app.globalData.BaseUrl + 'enterprise-user-enterpriseUser/changePhonePost';
Page({
  data:{
    registBtnTxt:"完成",
    registBtnBgBgColor:"#FDD000",
    getSmsCodeBtnTxt:"获取验证码",
    getSmsCodeBtnColor:"#FDD000",
    // getSmsCodeBtnTime:60,
    btnLoading:false,
    registDisabled:false,
    smsCodeDisabled:false,
    inputPassword: '',
    inputUserName: '',
    inputCode:''
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  },
  formSubmit:function(e){
    var param = e.detail.value;
    this.mysubmit(param);
  },
  mysubmit:function (param){
    var flag = this.checkUserName(param)&&this.checkPassword(param)&&this.checkSmsCode(param)
    var that = this;
    this.setregistData1();
  },
  setregistData1:function(){
    this.setData({
      registBtnTxt:"绑定中",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor:"#999",
      btnLoading:!this.data.btnLoading
    });
    var phone = this.data.inputUserName;
    var password = this.data.inputPassword;
    var code = this.data.inputCode;
    this.validCode();

  },
  autoLogin:function() {
    var phone = this.data.inputUserName;
    var password = this.data.inputPassword;
    wx.request({
      url: 'http://shipinzp.com:8081/oauth/token',
      data: {
        username: phone,
        password: password,
        userType:'personal',
        grant_type: 'password'
      },
      header: {
        'Authorization':'Basic d2ViYXBwOjg4ODg=',
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST', 
      success: function (res) {
        if (res.statusCode == 401 || res.statusCode == 400) {
      
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '登录失败',
            success: function () {
              that.setLoginData2();
            }
          })
        } else {

          let tokenone = wx.getStorageSync('enterprise')
          if(tokenone.enterpriseState == 'enterpriseunauthoriz'){
            //说明未认证企业去认证
            wx.redirectTo({
              url: '../guide/guide'
            })
            wx.showToast({
              title:'请先完成认证',
              icon: 'none'
            })
            return
          }
          app.setLoginUser(res.data);
          wx.switchTab({
            url: '../main/main'//参数只能是字符串形式，不能为json对象
          })
        }
      },
    })
  },
  validCode:function(){
    var phone = this.data.inputUserName;
    var code = this.data.inputCode;
    var that = this;
    wx.request({
      url: vaild_code_path,
      data: {
        phone: phone,
        userType: 'changePhone',
        code: code
      },
      header: 'application/Json',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.statusCode==200){
          that.register(res.data.id);
        }else{
       
          wx.showModal({
            title: '提示',
            content: '验证码错误',
            showCancel: false,
            success: function () {
              that.setregistData2();
            }
          })
           
        }
      },
      fail: function () {
        // fail
        that.setregistData2();
      },
      complete: function () {
      }
    })
  },

  register: function (smsCodeId){
    var phone = this.data.inputUserName;
    var password = this.data.inputPassword;
    var that = this
    wx.request({
      url: register_path,
      data: {
        userId:app.getUserId(),
        phone: phone,
        password: password,
        smsCodeId: smsCodeId
      },
      header: 'application/Json',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.statusCode==201){
            wx.showModal({
              title: '提示',
              content: '绑定成功',
              showCancel: false,
              success:function(){
                that.autoLogin()
              }
            })
        }else{
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.message,
            success: function () {
              that.setregistData2();
            }
          })
        }
      },
      fail: function () {
        that.setregistData2();
      },
      complete: function () {
      }
    })
  },
  setregistData2:function(){
    this.setData({
      registBtnTxt:"完成",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor:"#FDD000",
      btnLoading:!this.data.btnLoading
    });
  },
  checkUserName:function(param){ 
    var phone = app.regexConfig().phone;
    var inputUserName = this.data.inputUserName;
    if(phone.test(inputUserName)){
      return true;
    }else{
      wx.showModal({
        title: '提示',
        showCancel:false,
        showCancel: false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
  },
  checkPassword:function(param){
    var password = this.data.inputPassword;
    if(password.length<=0){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请设置密码'
      });
      return false;
    }else if(password.length<6||password.length>20){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '密码长度为6-20位字符'
      });
      return false;
    }else{
      return true;
    }
  },
  getSmsCode:function(param){
    var userName = this.data.inputUserName;
    var flag = this.checkUserName(param);
    if(!flag){
      return;
    }
    var that = this;
    wx.request({
      url: message_path,
      data: {
        phone: userName,
        sendType: 'reg',
        userType: 'enterprise'
      },
      header: 'application/Json',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.statusCode==201){
          wx.showModal({
            title: '短信发送',
            showCancel: false,
            content: '发送成功',
          })
          var count = 60;
          var si = setInterval(function () {
            if (count > 0) {
              count--;
              that.setData({
                getSmsCodeBtnTxt: count + ' s',
                getSmsCodeBtnColor: "#999",
                smsCodeDisabled: true
              });
            } else {
              that.setData({
                getSmsCodeBtnTxt: "获取验证码",
                getSmsCodeBtnColor: "#FDD000",
                smsCodeDisabled: false
              });
              count = 60;
              clearInterval(si);
            }
          }, 1000);

        }else{
          wx.showModal({
            title: '短信失败',
            content: res.data.message,
            showCancel: false,
          })

        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
      }
    })
    
  },
  checkSmsCode:function(param){
    var smsCode = this.data.inputCode;
    if(smsCode==""){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入短信验证码'
      });
      return false;
    }else{
      return true;
    }
  },
  redirectTo:function(){
  
    wx.redirectTo({
      url: '../login/index'//参数只能是字符串形式，不能为json对象
    })
  },
  getPhone:function(e){
    this.setData({
      inputUserName:e.detail.value
    })
  },
  getCode:function(e){
    this.setData({
      inputCode: e.detail.value
    })
  },
  getpwd: function (e) {
    this.setData({
      inputPassword: e.detail.value
    })
  }

})