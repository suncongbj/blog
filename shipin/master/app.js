//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    
  },
  onShow: function(options) {

  },
  getpath: 'https://www.shipinzp.com:8443',

  loginPath: 'https://shipinzp.com:8442/oauth/token',

  globalData: {
    userInfo: null,
    loginUser: null
  },
  getUserInfo: function(cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function(res) {
          var code = res.code;
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              var gender = res.userInfo.gender //性别 0：未知、1：男、2：女
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            },
            fail: function() {
              var tipStr = "您点击了拒绝授权，将无法正常使用******的功能体验。请再次点击授权，或者删除小程序重新进入。";

              // 调用微信弹窗接口
              wx.showModal({
                title: '警告',
                content: tipStr,
                showCancel: false,
                success: function(res) {
                  wx.openSetting({
                    success: function(data) {

                      wx.getUserInfo({
                        withCredentials: true,
                        success: function(data) {

                          wx.switchTab({
                            url: '/pages/index/main',
                            success: function(e) {

                              var page = getCurrentPages().pop();
                              if (page == undefined || page == null) return;
                              page.onLoad();
                            }
                          })
                        },
                        fail: function() {
                          wx.showModal({
                            title: '友情提示',
                            content: '请勾选授权按钮',
                            showCancel: false,
                            success: function() {
                              that.getUserInfo(cb);
                            }
                          })
                        }
                      });
                    },
                    fail: function() {
                      wx.showModal({
                        title: '友情提示',
                        content: tipStr,
                      })
                    }
                  });
                }
              });
            }
          })
        },
        fail: function() {

        }
      });
    }
  },
  regexConfig: function() {
    var reg = {
      email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
      phone: /^1(1|2|3|4|5|6|7|8|9|0)\d{9}$/
    }
    return reg;
  },
  setLoginUser: function(user) {
    this.globalData.loginUser = user
    var token = user.access_token.split(".");
    var userId = this.base64_decode(token[1])
    this.globalData.loginUser.userId = userId
    user.userId = userId
    user.time = new Date()
    wx.setStorage({
      key: 'loginUser',
      data: user,
    })
  },
  getAuthorization: function() {
     
    var loginUser = wx.getStorageSync("loginUser");

    return loginUser.token_type + " " + loginUser.access_token
  },
  getaccess_token: function() {
    var loginUser = wx.getStorageSync("loginUser");

    return loginUser.access_token
  },
  getrefresh_token: function() {
    var loginUser = wx.getStorageSync("loginUser");

    return loginUser.refresh_token
  },
  getUserId: function() {
    var loginUser = wx.getStorageSync("loginUser");

    return loginUser.userId
  },
  base64_decode: function(input) {
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


    return json.userId;
  },
  utf8_decode: function(utftext) {
    var string = '';
    let i = 0;
    let c = 0;
    let c1 = 0;
    let c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c1 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
        i += 2;
      } else {
        c1 = utftext.charCodeAt(i + 1);
        c2 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
        i += 3;
      }
    }
    return string;
  },
  validLogin: function() {
    var loginUser = wx.getStorageSync("loginUser");
    if (loginUser == null || loginUser == "") {
      wx.redirectTo({
        url: '../login/index' //参数只能是字符串形式，不能为json对象
      })
    } else {
      if (new Date().getTime() - new Date(loginUser.time).getTime() > loginUser.expires_in * 1000) {
        //清除缓存
        // wx.clearStorage();
        wx.redirectTo({
          url: '../login/index' //参数只能是字符串形式，不能为json对象
        })
        return
      }
    }
  },
  validToken:function(){
    wx.clearStorage();
    wx.redirectTo({
      url: '../login/index' //参数只能是字符串形式，不能为json对象
    })
  },

  date_time: function(val) {


    return this.date_time_formart(val, 'minute');

  },

  date_time_formart: function(val, formart) {
    if (val == null || val == "") {
      return "";
    }
    var date = new Date(parseInt(val, 10));


    //月份为0-11，所以+1，月份小于10时补个0
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;


    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();


    var hour = date.getHours();


    var minute = date.getMinutes();


    var second = date.getSeconds();


    var theTime = date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minute;
    if (formart == 'minute') {
      theTime = date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minute;
    } else if (formart == 'second') {
      theTime = date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minute + ":" + second;
    } else if (formart == 'day') {
      theTime = date.getFullYear() + "-" + month + "-" + currentDate;
    }
    return theTime;

  },
  refresh_token: function() {
    var loginUser = wx.getStorageSync("loginUser");
    const time = new Date().getTime();

    if (time - new Date(loginUser.time).getTime() -60*10*1000  < loginUser.expires_in*1000) {
      return
    }

    if (time - new Date(loginUser.time).getTime() > loginUser.expires_in*1000) {
      wx.redirectTo({
        url: '../login/index' //参数只能是字符串形式，不能为json对象
      })
      return
    }


    //刷新tonken
    var path = this.loginPath;
    var that = this
    wx.request({
      url: path,
      data: {
        refresh_token: that.getrefresh_token(),
        userType: 'personal',
        grant_type: 'refresh_token'
      },
      header: {
        'Authorization': that.getAuthorization(),
        'content-type': 'application/json',
        'access_token': that.getaccess_token()
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        if (res.statusCode == 200 || res.statusCode == 201) {
          that.setLoginUser(res.data);
        }
      },
      fail: function() {
        // fail
        that.setLoginData2();
      },
      complete: function() {
        
      }
    })


  }
})