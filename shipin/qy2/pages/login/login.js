 
const comfun = require('../../utils/comfun.js');
const app = getApp()
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
    // wx.redirectTo({
    //   url: '../guide/guide'
    // })
    this.autoLogin()
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
  autoLogin: function() {//检查本地缓存自动登录
    console.log('自动登录检测')
    var that = this
    console.log(wx.getStorageSync('mobile'))
    if(wx.getStorageSync('mobile')){
      //说明已存储用户手机号自动登录
      wx.request({
        url: 'http://shipinzp.com:8081/oauth/token',
        data: {
          username: wx.getStorageSync('mobile'),
          password: wx.getStorageSync('password'),
          userType:'enterprise',
          grant_type: 'password'
        },
        header: {
          'Authorization':'Basic d2ViYXBwOjg4ODg=',
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          if(res.statusCode == 401 || res.statusCode == 400) {
            wx.showToast({
              title: '账号信息过期请重新登录',
            })
            that.setLoginData2
          }else{
            app.globalData.mobile=that.data.inputUserName;
            app.globalData.token_type = res.data.token_type;
            app.globalData.access_token = res.data.access_token;
            var tokenarray = res.data.access_token.split(".");
            console.log(tokenarray)
            var tokenone = that.base64_decode(tokenarray[1]);
            var userId = that.base64_decode(tokenarray[1])
            wx.setStorageSync('userId',userId)
            wx.setStorageSync('enterprise', tokenone)
            wx.setStorageSync('enterpriseId', tokenone.enterpriseId)
            // var enterprise = JSON.parse(tokenone.substring(0, tokenone.length - 1))
            if(!tokenone.enterpriseId||tokenone.userState == 'personalunauthoriz'){
            //说明未认证企业去认证
              wx.redirectTo({
                url: '../guide/guide'
              })
              wx.showToast({
                title:'请先完成认证',
                icon: 'none'
              })
              return
            }else{
              wx.switchTab({
                url: '../main/main'//参数只能是字符串形式，不能为json对象
              })
            }
          }
        }
      })
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
    wx.request({
      url: 'http://shipinzp.com:8081/oauth/token',
      data: {
        username: phone,
        password: password,
        userType:'enterprise',
        grant_type: 'password'
      },
      header: {
        'Authorization':'Basic d2ViYXBwOjg4ODg=',
        'content-type': 'application/x-www-form-urlencoded'
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
          app.globalData.mobile=that.data.inputUserName;
          app.globalData.token_type = res.data.token_type;
          app.globalData.access_token = res.data.access_token;
          var tokenarray = res.data.access_token.split(".");
          var tokenone = that.base64_decode(tokenarray[1]);
          var userId = that.base64_decode(tokenarray[1])
          wx.setStorageSync('enterprise', tokenone)
          wx.setStorageSync('enterpriseId', tokenone.enterpriseId)
          wx.setStorageSync('mobile',phone)
          wx.setStorageSync('password',password)
          if(!tokenone.enterpriseId||tokenone.userState == 'personalunauthoriz'){
            //说明未认证企业去认证证
            wx.navigateTo({
              url: '../guide/guide'
            })
            wx.showToast({
              title:'请先完成认证',
              icon: 'none'
            })
          }else{
            wx.switchTab({
              url: '../main/main'//参数只能是字符串形式，不能为json对象
            })
          }
          // var enterprise = JSON.parse(tokenone.substring(0, tokenone.length - 1))
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
  },
  base64_decode: function (input) {
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = base64EncodeChars.indexOf(input.charAt(i++));
      enc2 = base64EncodeChars.indexOf(input.charAt(i++));
      enc3 = base64EncodeChars.indexOf(input.charAt(i++));
      enc4 = base64EncodeChars.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = output.match(/^{.*}/);


    var json = JSON.parse(output)

    return json;
  }

})