
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobName: "",//职位名称
    jobDesc: "",//职位描述
    job_dy: "", // 职位待遇,
    workAge: ['1年以下', '1-2年', '2-3年', '3-5年', '5-10年','无要求'],
    workAgeSelectShow:true,
    workAgeValue:'', //工作年限

    xueliArray: ['小学', '初中', '高中', '专科', '本科', '硕士', '博士', '博士后'],
    xueliSelectShow: true,
    xueliValue: '',//学历
    jobNum:'',  //招聘人数
    jobAddress:'',//详细地址

    salaryArray: ['面议', '1000~2000', '2000~5000', '5000~10000', '10000~15000', '15000~20000', '20000~25000', '25000'],
    salarySelectShow: true,
    salaryValue: '',//薪资范围

    jobType:'',//职位类型
    jobCity:'',//上班地点
    jobXz:'',//职位性质

    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id != undefined) {
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

  },
  submitInfo:function(){
    //保存操作
    var position = {}
    position.jobName = this.data.jobName
    position.jobDesc = this.data.jobDesc
    position.job_dy = this.data.job_dy
    position.workAgeValue = this.data.workAgeValue
    position.xueliValue = this.data.xueliValue
    position.jobNum = this.data.jobNum
    position.jobAddress = this.data.jobAddress
    position.salaryValue = this.data.salaryValue
    position.jobType = this.data.jobType
    position.jobCity = this.data.jobCity
    position.jobXz = this.data.jobXz

    console.log("本次被保存的对象是：",position)


  },
  getJobDy: function (e) {
    this.setData({
      job_dy: e.detail.value
    })
  },
  getJobDesc: function (e) {
    this.setData({
      jobDesc: e.detail.value
    })
  },
  getJobName: function (e) {
    this.setData({
      jobName: e.detail.value
    })
  },
  getJobAddress: function (e) {
    this.setData({
      jobAddress: e.detail.value
    })
  },
  getjobType: function (e) {
    this.setData({
      jobType: e.detail.value
    })
  },
  getjobCity: function (e) {
    this.setData({
      jobCity: e.detail.value
    })
  },
  getjobXz: function (e) {
    this.setData({
      jobXz: e.detail.value
    })
  },
  
  getJobNum: function (e) {
    var regNum = new RegExp('[0-9]', 'g');
    var value = e.detail.value
    var rsNum = regNum.exec(value);
    if (rsNum == null || rsNum==''){
      value = ""
    }

    this.setData({
      jobNum: value
    })
  },
  workAgeSelect:function(){
    var that = this
    that.setData({
      workAgeSelectShow: !that.data.workAgeSelectShow,
    });
  },
  bindWorkAgeTap: function (e) {
    var that = this
    var num = e.currentTarget.dataset.id;
    that.setData({
      workAgeSelectShow: !that.data.workAgeSelectShow,
      workAgeValue: e.currentTarget.dataset.name
    });
  },
  xueliSelect: function () {
    var that = this
    that.setData({
      xueliSelectShow: !that.data.xueliSelectShow,
    });
  },
  bindxueliTap: function (e) {
    var that = this
    var num = e.currentTarget.dataset.id;
    that.setData({
      xueliSelectShow: !that.data.xueliSelectShow,
      xueliValue: e.currentTarget.dataset.name
    });
  },
  salarySelect: function () {
    var that = this
    that.setData({
      salarySelectShow: !that.data.salarySelectShow,
    });
  },
  bindsalaryTap: function (e) {
    var that = this
    var num = e.currentTarget.dataset.id;
    that.setData({
      salarySelectShow: !that.data.salarySelectShow,
      salaryValue: e.currentTarget.dataset.name
    });
  },
})