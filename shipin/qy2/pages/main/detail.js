const app = getApp()
Page({
  data: {
    id: '',
    perSonalUser: {},//个人信息
    jobIntention: {},//求职意向
    educationExperience: [],//教育背景
    workExperience:[],//工作经验
    projectExperience:[],//项目经验
    selfAssessment: '',//自我评价
  },

  onLoad: function (e) {
    console.log(e)
    this.setData({
      id: e.id
    })
    this.getData()
  },
  getData: function() {
    let url = app.globalData.BaseUrl + 'personal-position/'+ this.data.id
    var self = this
    wx.request({
        url: url,
        method: 'GET',
        data: {},
        header: {
          'Authorization': app.globalData.token_type + " " + app.globalData.access_token,
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.statusCode == 200) {
            //个人信息处理
            for (let i in res.data.perSonalUser) {
              if(res.data.perSonalUser[i] == null){
                res.data.perSonalUser[i] = ''
              }
            }
            res.data.perSonalUser.birthDate=res.data.perSonalUser.birthDate.substr(0,10)
            res.data.perSonalUser.workingDate=res.data.perSonalUser.workingDate.substr(0,10)
            //工作经验处理
            for (let i in res.data.jobIntention) {
              if(res.data.jobIntention[i] == null){
                res.data.jobIntention[i] = ''
              }
            }
            if(res.data.jobIntention.expectSalaryMin==0){
              res.data.jobIntention.expectSalaryMin = '面议'
            }else{
              res.data.jobIntention.expectSalaryMin = res.data.jobIntention.expectSalaryMin+'-'+res.data.jobIntention.expectSalaryMax
            }
            //教育背景处理
            for (let i=0;i<res.data.educationExperience.length;i++){
              for(let j in res.data.educationExperience[i]){
                res.data.educationExperience[i][j]=res.data.educationExperience[i][j]==null?'':res.data.educationExperience[i][j]
              }
              res.data.educationExperience[i].schoolTimeStart = res.data.educationExperience[i].schoolTimeStart.substr(0,10)
              res.data.educationExperience[i].schoolTimeStop = res.data.educationExperience[i].schoolTimeStop.substr(0,10)
            }
            //工作经验处理
            for(let i = 0 ; i < res.data.workExperience.length;i++){
              for(let j in res.data.workExperience[i]){
                res.data.workExperience[i][j]=res.data.workExperience[i][j]==null?'':res.data.workExperience[i][j]
              }
              res.data.workExperience[i].workingTimeStart = res.data.workExperience[i].workingTimeStart.substr(0,7)
              res.data.workExperience[i].workingTimeStop = res.data.workExperience[i].workingTimeStop.substr(0,7)
            }
            //项目经验处理
            for(let i = 0 ; i < res.data.projectExperience.length;i++){
              for(let j in res.data.projectExperience[i]){
                res.data.projectExperience[i][j]=res.data.projectExperience[i][j]==null?'':res.data.projectExperience[i][j]
              }
              res.data.projectExperience[i].projectTimeStart = res.data.projectExperience[i].projectTimeStart.substr(0,7)
              res.data.projectExperience[i].projectTimeStop = res.data.projectExperience[i].projectTimeStop.substr(0,7)
            }
            self.setData({
              perSonalUser:res.data.perSonalUser,
              jobIntention:res.data.jobIntention,
              educationExperience:res.data.educationExperience,
              workExperience:res.data.workExperience,
              projectExperience:res.data.projectExperience,
              selfAssessment:res.data.selfAssessment,
            })
          } else if (res.statusCode == 401) {
            //登录去
          } else {
            wx.showToas({
              title: res.errMsg
            })
          }
        },
        fail: function (error) {
          
        },
        complete: function () {

        }
      })
  },
})