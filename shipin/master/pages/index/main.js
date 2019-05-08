// pages/index/main.js首页
var app = getApp();
var path = app.getpath + '/api/enterprise-search/position';
var search = app.getpath + '/api/enterprise-search/recommend'
var authentication = app.getpath +'/api/personal-user-perSonalUser'
var page = 1;
var pagesize = 10;
var key = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    newsList: [],
    bidList: [],
    topList: [],
    hidden: false,
    hasMore: true,
    hasRefesh: false,
    adress: '北京市',
    adressid: '101',
    searchData: '',
    inputShowed: false,
    inputVal: "",
    pagesize:10,
    page:1,

    searchIng: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.isAuthentication()
    // wx.navigateTo({url:"../jobDetail/main?id="+"128d6cdf-f638-49ae-8551-fe151e2f6254"})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.validLogin();
    this.getData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
      this.setData({
        page:1,
        pagesize:10,
        newsList:[]
      })
    this.getData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var page = this.data.page +1
    this.setData({
      page: page
    })
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    
  },
  isAuthentication:function() {
    wx.request({
      url: authentication,
      data: {
        id: app.getUserId()
      },
      header: {
        'Authorization': app.getAuthorization(),
        'content-type': 'application/json',
        'access_token': app.getaccess_token()
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        if(res.data._embedded.perSonalUsers.length) {
          let user_use = res.data._embedded.perSonalUsers[0]
          if(user_use.cerStatus=='personalunauthoriz') {
            wx.redirectTo({url:'../userAuthentication/userAuthentication'})
          }else{
            wx.setStorageSync('cerStatus', true)
            return
          }
        }
      },
      fail: function() {
      },
      complete: function() {
      }
    })
  },
  getData: function() {
    var that = this;
    var page = this.data.page
    var pagesize = this.data.pagesize
    let url = this.data.searchIng?path:search
    wx.request({
      url: path,
      data: {
        page: page,
        size: pagesize,
        keyword:this.data.inputVal
      },
      header: {
        'Authorization': app.getAuthorization(),
        'content-type': 'application/json',
        'access_token': app.getaccess_token()
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        console.log(res)
        if (res.statusCode == 200) {
            var list = res.data.res
            var newsList = that.data.newsList
            if(that.data.page==1){
              var bidList=[]
              var topList=[]
              res.data.bid.forEach(element => {
                element.time = that.date_time(element.createTime)
                element.city = element.city == null ? "" : element.city+" | "
                element.workingLife = element.workingLife == null ? "" : element.workingLife + " | "
                element.minimumEducational = element.minimumEducational == null ? "" : element.minimumEducational
                element.jobHighlights = element.jobHighlights ? element.jobHighlights : ''
                if (!element.monthlyRangeMin){
                  element.salar = "面议"
                }else{
                  if (element.monthlyRangeMax == null) {
                    element.salar = element.monthlyRangeMin+"以上/月"
                  }else{
                    element.salar = element.monthlyRangeMin + "~" + element.monthlyRangeMax + "/月"
                  }
                }
                if(element.vipLevel=='general') {
                  element.isVip =false
                }else{
                  element.isVip = true
                }
                bidList.push(element)
              })
              res.data.top.forEach(element => {
                element.time = that.date_time(element.createTime)
                element.city = element.city == null ? "" : element.city+" | "
                element.workingLife = element.workingLife == null ? "" : element.workingLife + " | "
                element.minimumEducational = element.minimumEducational == null ? "" : element.minimumEducational
                element.jobHighlights = element.jobHighlights ? element.jobHighlights : ''
                if (!element.monthlyRangeMin){
                  element.salar = "面议"
                }else{
                  if (element.monthlyRangeMax == null) {
                    element.salar = element.monthlyRangeMin+"以上/月"
                  }else{
                    element.salar = element.monthlyRangeMin + "~" + element.monthlyRangeMax + "/月"
                  }
                }
                if(element.vipLevel=='general') {
                  element.isVip =false
                }else{
                  element.isVip = true
                }
                topList.push(element)
              })

              that.setData({
                bidList: bidList
              })
              that.setData({
                topList: topList
              })
            }
            list.forEach(element => {
              element.time = that.date_time(element.createTime)
              element.city = element.city == null ? "" : element.city+" | "
              element.workingLife = element.workingLife == null ? "" : element.workingLife + " | "
              element.minimumEducational = element.minimumEducational == null ? "" : element.minimumEducational
              element.jobHighlights = element.jobHighlights ? element.jobHighlights : ''
              if (!element.monthlyRangeMin){
                element.salar = "面议"
              }else{
                if (element.monthlyRangeMax == null) {
                  element.salar = element.monthlyRangeMin+"以上/月"
                }else{
                  element.salar = element.monthlyRangeMin + "~" + element.monthlyRangeMax + "/月"
                }
              }
              if(element.vipLevel=='general') {
                element.isVip =false
              }else{
                element.isVip = true
              }
              newsList.push(element)
            })
            if(res.data.totalpage == that.data.page) {
              that.setData({
                hasMore:false
              })
            }
            that.setData({
              newsList: newsList
            });
        } else if (res.statusCode == 401) {
            app.validToken();
        }

      },
      fail: function() {
        // fail
        console.log('fail')
      },
      complete: function() {
        // complete
      }
    })
  },
  date_time: function(val) {
    var date = new Date(parseInt(val, 10));


    //月份为0-11，所以+1，月份小于10时补个0
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;


    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();


    var hour = date.getHours();


    var minute = date.getMinutes();


    var second = date.getSeconds();


    // var theTime = date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minute + ":" + second;
    // var theTime = date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minute;

    var theTime =  month + "月" + currentDate + "日";

    return theTime;

  },
  showInput: function() {
    this.setData({
      inputShowed: true,
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false,
      searchIng: false,
      newsList: []
    });
    this.getData()
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  searchList: function() {
    if (this.data.inputVal == null || this.data.inputVal == '') {
      return wx.showToast({
        title: '请输入关键字',
        icon: 'none'
      })
    }
    this.setData({
      searchIng: true,
      newsList: [],
      page: 1
    })
    this.getData()
  },

})