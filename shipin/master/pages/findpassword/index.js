var app = getApp();
const submit_path = app.getpath + '/api/personal-user-perSonalUser/resetPasswordPost'//PATCH phone password smsCodeId
const sms_path = app.getpath + '/api/sms-code/send'
const sms_check = app.getpath + '/api/sms-code/check'

Page({
  data:{
    registBtnTxt:"提交",
    registBtnBgBgColor:"#FDD000",
    getSmsCodeBtnTxt:"获取验证码",
    getSmsCodeBtnColor:"#FDD000",
    btnLoading:false,
    registDisabled:false,
    smsCodeDisabled:false,

    phoneNum: '',
    sms_code: '',
    password: '',
    
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
  keyPassword:function(e){
   var value  = e.detail.value;
   this.setData({
    password: value     
   });
  },
  keySmsCode:function(e){
   var value  = e.detail.value;
   this.setData({
    sms_code: value     
   });
  },
  getPhoneNum:function(e){
   var value  = e.detail.value;
   this.setData({
    phoneNum: value     
   });
  },
  mysubmit:function (param){
    var that = this;
    if(this.checkPassword()) {
      this.setregistData1();
      wx.request({
        url: sms_check,
        data: {
          phone: this.data.phoneNum,
          userType: 'personal',
          code: this.data.sms_code,
        },
        header: {
          
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          if(res.statusCode == 201|| res.statusCode == 200) {
            wx.request({
              url: submit_path,
              data: {
                phone: that.data.phoneNum,
                password: that.data.password,
                smsCodeId: res.data.id
              },
              method: 'POST',
              success:function(res2) {
                if(res2.statusCode == 201 || res2.statusCode == 200 || res2.statusCode == 204) {
                  wx.showToast({
                    title: '修改成功！',
                    icon: 'success',
                  });
                  setTimeout(()=>{
                    wx.redirectTo({
                      url: '../login/index' //参数只能是字符串形式，不能为json对象
                    })
                  },500)
                }else {
                  wx.showToast({
                    title: res.data.message,
                    icon: 'none'
                  })
                  that.setregistData2();
                }
              }
            })
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
            that.setregistData2();
          }
        },
      })
    }
  },
  setregistData1:function(){
    this.setData({
      registBtnTxt:"提交中",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor:"#999",
      btnLoading:!this.data.btnLoading
    });
  },
  setregistData2:function(){
    this.setData({
      registBtnTxt:"提交",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor:"#FDD000",
      btnLoading:!this.data.btnLoading
    });
  },
  checkUserName:function(num){ 
    var phone = app.regexConfig().phone;
    if(phone.test(num)){
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
  checkPassword:function(){
    if(this.data.password.length<=0){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请设置新密码'
      });
      return false;
    }else if(this.data.password.length<6||this.data.password.length>20){
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
  getSmsCode:function(){
    var phoneNum = this.data.phoneNum;
    var that = this;
    var count = 60;
    if(this.checkUserName(phoneNum)){
      //获取验证码接口sms_path
      wx.request({
        url: sms_path,
        data: {
          phone: this.data.phoneNum,
          sendType: 'resetPassword',
          userType: 'personal',
        },
        header: {
          
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          if(res.statusCode == 201 || res.statusCode == 200) {
            var si = setInterval(function(){
              if(count > 0){
                count--;
                that.setData({
                  getSmsCodeBtnTxt:count+' s',
                  getSmsCodeBtnColor:"#999",
                  smsCodeDisabled: true
                });
              }else{
                that.setData({
                  getSmsCodeBtnTxt:"获取验证码",
                  getSmsCodeBtnColor:"#FDD000",
                  smsCodeDisabled: false
                });
                count = 60;
                clearInterval(si);
              }
            },1000);
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
        },
      })
      
    } 
  },
})