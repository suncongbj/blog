// pages/educationbg/add.js
var Util = require('../../utils/utilm.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    items: ['小学','初中','高中','专科','本科','硕士','博士','博士后'],
    itemid: ['小学', '初中', '高中', '专科', '本科', '硕士', '博士', '博士后'],
    // items: [],
    ctype: 2,
    zid: '',
    Rid: '',
    actionSheetHidden: true,
    startDate: '1977-01-01',//开始时间
    schoolname: '',
    cername: '',
    degree: '',
    degreeText: '',
 
    entrancetime: Util.formatDate(new Date()),//入学时间
    graduationtime: Util.formatDate(new Date()),//毕业时间
    bdate: '',
    jdate: '',
    byears: Util.formatDate(new Date()),
    jyears: Util.formatDate(new Date()),
    index_xz:0,
    workXz:['是','否'],
    id:''
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id!=undefined){
      this.setData({
        id: options.id
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.showData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }, input1js: function (e) {
    this.setData({
      schoolname: e.detail.value
    })
  },
  input2js: function (e) {
    this.setData({
      cername: e.detail.value
    })
  },
  sumbitbutton: function (e) {

    var that = this

    this.setData({
      loading: true
    });
    if (that.data.schoolname == null || that.data.schoolname == "") {
      wx.showModal({
        title: '提示',
        content: '请输入学校名称',
        showCancel: false,
        success: function (res) {

        }


      });
      return;
    }
    if (that.data.entrancetime == null || that.data.entrancetime == "") {
      wx.showModal({
        title: '提示',
        content: '请选择入学时间',
        showCancel: false,
        success: function (res) {

        }


      });
      return;
    }
    if (that.data.graduationtime == null || that.data.graduationtime == "") {
      wx.showModal({
        title: '提示',
        content: '请选择毕业时间',
        showCancel: false,
        success: function (res) {

        }


      });
      return;
    }

    if (that.data.cername == null || that.data.cername == "") {
      wx.showModal({
        title: '提示',
        content: '请填写专业名称',
        showCancel: false,
        success: function (res) {

        }


      });
      return;
    }

    //新增或者更新操作
    var degree = this.data.degreeText
    var recruitment = this.data.workXz[this.data.index_xz]
    var professional = this.data.cername
    var schoolName = this.data.schoolname
    var schoolTimeStart = this.data.byears
    var schoolTimeStop = this.data.jyears
    var userId = app.getUserId()

    var postData= {
      degree: degree,
      recruitment: recruitment,
      professional: professional,
      schoolName: schoolName,
      schoolTimeStart: new Date(schoolTimeStart),
      schoolTimeStop: new Date(schoolTimeStop),
      userId: userId,
    }
   
    this.addRequest(postData)
  },
  bindstartsttuChange: function (e) {
    var that = this
    var val = e.detail.value
    that.setData({
      bdate: val,
      byears: Util.splitDayDate(val)
    })
  },
  bindgradtimeChange: function (e) {
    var that = this
    var val = e.detail.value
    that.setData({
      jdate: val,
      jyears: Util.splitDayDate(val)
    })
  },
  choose: function (e) {
    var that = this
    that.setData({
      actionSheetHidden: !that.data.actionSheetHidden,
    });

  },
  bindItemTap: function (e) {
    var that = this
    var num = e.currentTarget.dataset.id;
    that.setData({
      actionSheetHidden: !that.data.actionSheetHidden,
      degreeText: e.currentTarget.dataset.name,
      degree: that.data.itemid[num]
    });

  },
  bindPickerChange: function (e) {
    this.setData({
      index_xz: e.detail.value
    })
  },
  addRequest:function(data){

    var method = "POST"
    var path = app.getpath + "/api/personal-position-educationExperience";
    
    if(this.data.id!=undefined&&this.data.id!=null&&this.data.id!=''){
      method = "PATCH"
      path = app.getpath + "/api/personal-position-educationExperience/"+this.data.id
    }
    
    wx.request({
      url: path,
      data: data,
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Authorization': app.getAuthorization(),
        'content-type': 'application/json',
        'access_token': app.getaccess_token()
      },
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
         if(res.statusCode == 401) {
          app.validToken();
          return;
        }
       
        wx.navigateBack({ changed: true });
      },
      fail: function (e) {
        // fail
        var msg = '服务器异常'
        if (e.errMsg =='request:fail method is invalid'){
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
  showData:function(){
    var id = this.data.id
    if(id==undefined||id==null||id==''){
      return;
    }
    var that = this
    var path = app.getpath + "/api/personal-position-educationExperience/"+id;
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
        if (res.statusCode==200){
          var recruitment = res.data.recruitment

            that.setData({
              schoolname: res.data.schoolName,
              byears: app.date_time_formart(res.data.schoolTimeStart, 'day'),
              jyears: app.date_time_formart(res.data.schoolTimeStop, 'day'),
              cername: res.data.professional,
              index_xz: recruitment=="是"?0:1,
              degreeText: res.data.degree,
              specialfieldName: res.data.professional
            })

        }else{
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
 