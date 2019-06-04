 
var login_path = 'https://shipinzp.com:8081/oauth/token';

Page({
  data:{
    loginBtnTxt:"登录",
    loginBtnBgBgColor:"#FDD000",
    btnLoading:false,
    disabled:false,
    inputUserName: '',
    inputPassword: '',
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
    var flag = this.checkUserName(param)&&this.checkPassword(param)
    if(flag){
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        this.setLoginData1();
    } 
    
  },
  setLoginData1:function(){
    this.setData({
      loginBtnTxt:"登录中",
      disabled: !this.data.disabled,
      loginBtnBgBgColor:"#999",
      btnLoading:!this.data.btnLoading
    });
    var that = this;
    var phone = this.data.inputUserName;
    var password = this.data.inputPassword;
    console.log(1)
    wx.request({
      url: login_path,
      data: {
        username: phone,
        password: password,
        userType:'personal',
        grant_type: 'password'
      },
      header: {
        'Authorization':'Basic d2ViYXBwOjg4ODg=',
        'content-type': 'application/x-www-form-urlencoded'
        // 'content-type': 'application/json'
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log("登录信息")
        console.log(res)
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
         console.log(res)
          wx.switchTab({
            url: '../index/main'//参数只能是字符串形式，不能为json对象
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
  setLoginData2:function(){
    this.setData({
      loginBtnTxt:"登录",
      disabled: !this.data.disabled,
      loginBtnBgBgColor:"#ff9900",
      btnLoading:!this.data.btnLoading
    });
  },
  checkUserName:function(param){
    
    var phone = /^1(3|4|5|7|8)\d{9}$/;
    var inputUserName = this.data.inputUserName;
    if(phone.test(inputUserName)){
      return true;
    }else{
      wx.showModal({
        title: '提示',
        showCancel:false,
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
        showCancel:false,
        content: '请输入密码'
      });
      return false;
    }else{
      return true;
    }
  },
  checkUserInfo:function(param){
    var username = param.username.trim();
    var password = param.password.trim();
    var that = this;
    if((username=='admin@163.com'||username=='18500334462')&&password=='000000'){
        setTimeout(function(){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1500
          });
          that.setLoginData2();
          that.redirectTo(param);
        },2000);
    }else{
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '用户名或密码有误，请重新输入'
      });
      this.setLoginData2();
    }
  },
  redirectTo:function(){
    //需要将param转换为字符串 
    wx.redirectTo({
      url: '../resume/main'//参数只能是字符串形式，不能为json对象
    })
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