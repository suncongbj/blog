// pages/workbj/workbj.js
var app = getApp();
var path = app.getpath + "/api/personal-position-projectExperience?page=1&size=10&projection=manage&userId=" + app.getUserId();

Page({
  data: {
    workListData: [],

  },
  showData: function () {
    var that = this
    wx.request({
      url: path,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        'Authorization': app.getAuthorization(),
        'content-type': 'application/json',
        'access_token': app.getaccess_token()
      },
      success: function (res) {
        console.log(res)

        var list = res.data._embedded.projectExperiences
        list.forEach(element => {
          element.stime = app.date_time_formart(element.projectTimeStart,'day')
          element.etime = app.date_time_formart(element.projectTimeStop, 'day') == "" ? "至今" : app.date_time_formart(element.projectTimeStop, 'day')
        })
        // success
        that.setData({
          workListData: list
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.showData()
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  mylongtap: function (e) {
    console.log(e)
    var id = e.currentTarget.id
    var that = this
    var path = app.getpath + "/api/personal-position-projectExperience/" + id;
    wx.showModal({
      title: '是否删除',
      content: '您确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: path,
            data: {},
            method: 'DELETE', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'Authorization': app.getAuthorization(),
              'content-type': 'application/json',
              'access_token': app.getaccess_token()
            },
            // header: {}, // 设置请求的 header
            success: function (res) {
              // success
              console.log("xxxxxx返回", res)
              if (res.statusCode == 200 || res.statusCode == 204) {
                wx.showToast({
                  title: '删除成功',
                })
                that.showData();
              } else if (res.statusCode == 401) {
                app.validToken();
                return;
              }
            },
            fail: function () {
              // fail
              toash('服务器异常');
            },
            complete: function () {
              // complete
            }
          })
        }
      }
    })
  },
  myClickTap: function (e) {
    var id = e.currentTarget.id

    wx.navigateTo({
      url: 'addProjectbj?id=' + id
    })
  }
})