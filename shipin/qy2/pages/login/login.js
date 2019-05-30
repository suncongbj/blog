 
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

    phone: '',
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // wx.redirectTo({
    //   url: '../guide/guide'
    // })
    let self = this
    this.getUserInfo()
    setTimeout(function(){
      self.autoLogin()
    },100)
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
        this.setLoginData1();
    } 
  },
  weixinLogin:function() {
    let self = this
    let that = this
    wx.showLoading()
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
              appid: 'wxfaab92a346113ace',
              secret: '22a674266402533f6b410d53b8c3abea',
              js_code: res.code,
              grant_type: 'authorization_code',
            },
            success:function(res2) {
              //openid注册
              wx.request({
                url: 'http://www.shipinzp.com/api/enterprise-user-enterpriseUser/thirdreg',
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
                      url: 'http://shipinzp.com:8081/oauth/token',
                      data: {
                        grant_type: 'thirdParty',
                        openid: res2.data.openid,
                        platform:'wechat',
                        userType: 'enterprise'
                      },
                      header: {
                        'Authorization':'Basic d2ViYXBwOjg4ODg=',
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                      // header: {}, // 设置请求的 header
                      success: function (res4) {
                        wx.hideLoading()
                        if(res4.statusCode == 401 || res4.statusCode == 400) {
                          wx.showToast({
                            title: '账号信息过期请重新登录',
                          })
                          that.setLoginData2()
                        }else{
                          app.globalData.mobile=that.data.inputUserName;
                          app.globalData.token_type = res4.data.token_type;
                          app.globalData.access_token = res4.data.access_token;
                          var tokenarray = res4.data.access_token.split(".");
                          var tokenone = that.base64_decode(tokenarray[1]);
                          var userId = that.base64_decode(tokenarray[1])
                          wx.setStorageSync('userId',userId)
                          wx.setStorageSync('weixin','weixin')
                          wx.setStorageSync('enterprise', tokenone)
                          wx.setStorageSync('enterpriseId', tokenone.enterpriseId)
                          let phone = self.data.phone
                          if(!phone){
                            //去绑定手机
                            wx.navigateTo({
                              url: '../bindPhone/bindPhone'
                            })
                          }else if(tokenone.enterpriseState == 'enterpriseunauthoriz'){
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
                      },
                    })
                  }
                },
              })

            }
          })
        }
      })
  },
  autoLogin: function() {//检查本地缓存自动登录
    var that = this
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
            that.setLoginData2()
          }else{
            app.globalData.mobile=that.data.inputUserName;
            app.globalData.token_type = res.data.token_type;
            app.globalData.access_token = res.data.access_token;
            var tokenarray = res.data.access_token.split(".");
            var tokenone = that.base64_decode(tokenarray[1]);
            var userId = that.base64_decode(tokenarray[1])
            wx.setStorageSync('userId',userId)
            wx.setStorageSync('enterprise', tokenone)
            wx.setStorageSync('enterpriseId', tokenone.enterpriseId)
            let phone = that.data.phone
            console.log(phone)
            if(!phone){
              //去绑定手机
              wx.navigateTo({
                url: '../bindPhone/bindPhone'
              })
              console.log(phone)
            }else if(tokenone.enterpriseState == 'enterpriseunauthoriz'){
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
    }else if(wx.getStorageSync('weixin')) {
      this.weixinLogin()
    }
  },
  getUserInfo: function(e) {
    let that = this
    var user_info = wx.getStorageSync('enterprise')
    wx.request({
        url: app.globalData.BaseUrl + 'enterprise-user-enterpriseUser', //仅为示例，并非真实的接口地址
        method: 'GET',
        data: {
          id: user_info.userId,
          projection: 'info'
        },
        header: {
          'Authorization': app.globalData.token_type + " " + app.globalData.access_token,
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          let infos = res.data._embedded.enterpriseUsers[0]
          that.setData({
            phone: infos.phone || ''
          })
        },
      })
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
          if(tokenone.enterpriseState == 'enterpriseunauthoriz'){
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
    
    var phone = /^1(0|1|2|3|4|5|6|7|8|9)\d{9}$/;
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