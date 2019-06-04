var app = getApp();
var login_path = app.loginPath;

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
    
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    wx.clearStorage();
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
        this.setLoginData1();
    } 
    
  },
  weixinLogin:function() {
    let self = this
    // 页面初始化 options为页面跳转所带来的参数
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //获取openid
        wx.request({
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          method: 'GET',
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wxbe718ba0e7c9d150',
            secret: '0cb24d239cabb56043ce064b29ae9cb5',
            js_code: res.code,
            grant_type: 'authorization_code',
          },
          success:function(res2) {
            //openid注册
            wx.request({
              url: app.getpath+'/api/personal-user-perSonalUser/thirdreg',
              data: {
                openid: res2.data.openid,
                regType: 'wechat',
                avatarUrl: null,
              },
              header: {
                // 'Authorization':'Basic d2ViYXBwOjg4ODg=',
                // 'content-type': 'application/x-www-form-urlencoded'
                'content-type': 'application/json'
              },
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function (res3) {
                if (res3.statusCode == 401 || res3.statusCode == 400) {
              
                  wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: '登录失败',
                    success: function () {
                      that.setLoginData2();
                    }
                  })
                } else {
                  //openid登录
                  wx.request({
                    url: login_path,
                    data: {
                      grant_type: 'thirdParty',
                      openid: res2.data.openid,
                      platform:'wechat',
                      userType: 'personal'
                    },
                    header: {
                      'Authorization':'Basic d2ViYXBwOjg4ODg=',
                      'content-type': 'application/x-www-form-urlencoded'
                      // 'content-type': 'application/json'
                    },
                    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    // header: {}, // 设置请求的 header
                    success: function (res4) {
                      if (res4.statusCode == 401 || res4.statusCode == 400) {
                    
                        wx.showModal({
                          title: '提示',
                          showCancel: false,
                          content: '登录失败',
                          success: function () {
                            that.setLoginData2();
                          }
                        })
                      } else {
                        app.setLoginUser(res4.data);
                        wx.switchTab({
                          url: '../index/main'//参数只能是字符串形式，不能为json对象
                        })
                      }
                    },
                  })
                }
              },
            })

          }
        })
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           // this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
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
          app.setLoginUser(res.data);
          wx.switchTab({
            url: '../index/main'//参数只能是字符串形式，不能为json对象
          })
        }
      },
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
    
    var phone = app.regexConfig().phone;
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