var app = getApp();
var path = app.getpath + '/api/personal-user-perSonalUser/updatePersonalUser';
Page({
	data: {
		id: '',//用户id
		name: '',//姓名
		gender: '',//性别
		birthDate: '',//出生日期
		phone: '',//手机号
		degree: '',//学历
		email: '',//邮箱
		livesProvince: '',//现居省
		livesCity: '',//现居市
		livesArea: '',//现居区
		bornProvince: '',//户口省
		bornCity: '',//户口市
		bornArea: '',//户口区
		workingDate: '',//参加工作时间

		genderList: ['男','女'],
		degreeList: ['小学','初中','高中','专科','本科','硕士','博士','博士后'],
		liveRegion: ['辽宁省', '鞍山市', '铁东区'],
		birthRegion: ['辽宁省', '鞍山市', '铁东区'],
	},
	onLoad: function(options) {
		this.setData({
			id: app.getUserId()
		})
	},
	bindBirthDate(e) {
		console.log(e.detail.value)
	    this.setData({
			birthDate: e.detail.value
		})
	},
	bindWorkingDate(e) {
		this.setData({
			workingDate: e.detail.value
		})
	},
	keyName:function(e) {
		this.setData({
			name: e.detail.value,
		})
	},
	keyPhone:function(e){
		this.setData({
			phone: e.detail.value,
		})
	},
	keyEmail:function(e){
		this.setData({
			email: e.detail.value,
		})
	},
	pickerSex: function(e) {
		this.setData({
			gender: this.data.genderList[Number(e.detail.value)]
		})
	},
	pickerGegree: function(e){
		this.setData({
			degree: this.data.degreeList[Number(e.detail.value)]
		})
	},
	bindRegionChange(e) {
		this.setData({
			liveRegion: e.detail.value
		})
	},
	bindBirthRegionChange(e) {
		this.setData({
			birthRegion: e.detail.value
		})
	},
	submit:function() {
		let data = {}
		data.id = this.data.id
		data.gender = this.data.gender
		data.degree = this.data.degree
		data.email = this.data.email
		data.livesProvince = this.data.liveRegion[0]
		data.livesCity = this.data.liveRegion[1]
		data.livesArea = this.data.liveRegion[2]
		data.bornProvince = this.data.birthRegion[0]
		data.bornCity = this.data.birthRegion[1]
		data.bornArea = this.data.birthRegion[2]
		data.birthDate =  new Date(this.data.birthDate)
		data.workingDate = new Date(this.data.birthDate)
		data.avatarUrl = null
		wx.request({
			url: path,
			data: data,
			header: {
				'Authorization': app.getAuthorization(),
				'content-type': 'application/json',
				'access_token': app.getaccess_token()
			},
			method: 'POST',
			success: function(res) {
				wx.showToast({
					title: '提交成功！'
				})
				wx.switchTab({
				  	url: '../resume/main'
				})
			},
			fail: function() {
			},
			complete: function() {
			}
			})
		}
})