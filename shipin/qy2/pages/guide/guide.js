const app = getApp()
Page({
	data: {
		step: 0,//阶段1阶段2
		//企业认证
		userId: '',//用户id
		enterpriseName: '',//企业名称
		legalPerson: '',//法人姓名
		businessLicenseUrl: '',//营业执照图片地址
		qualificationUrl: '',//资质地址

		//个人认证
		name: '',//姓名
		idCard: '',//身份证号
		position: '',//职务
		workCertificateUrl: '',//职务证明图
	},
	onLoad:function(options){
		this.getUserInfo()
	},
	getUserInfo() {
		var user_info = wx.getStorageSync('enterprise')
		console.log(user_info)
		this.setData({
			userId: user_info.userId
		})
		if(!user_info.enterpriseState == 'enterpriseunauthoriz') {
			this.setData({
				step: 1
			})
		}
	},
	handlerNext:function() {//点击下一步
		let self = this
		if(!this.data.enterpriseName||!this.data.legalPerson||!this.data.businessLicenseUrl||!this.data.qualificationUrl){
			wx.showToast({
				title: '请完善信息后进行下一步',
				icon: 'none',
			})
			return
		}
		wx.request({
			url: app.globalData.BaseUrl+'enterprise-user-enterpriseInfoAudit',
			method: 'POST',
			data: {
				userId: this.data.userId,
				enterpriseName: this.data.enterpriseName,
				legalPerson: this.data.legalPerson,
				businessLicenseUrl: this.data.businessLicenseUrl,
				qualificationUrl: this.data.qualificationUrl,
			},
			header: {
				'Authorization': app.globalData.token_type + " " + app.globalData.access_token,
				'content-type': 'application/json' // 默认值
			},
			success: function (res) {
				if(res.statusCode == 200 ||res.statusCode == 201) {
					self.setData({
						step: 1
					})
				}else {
					wx.showToast({
						title: res.errMsg,
						icon: 'none'
					})
				}
			},
			fail: function (error) {
				wx.showToast({
						title: error,
						icon: 'none'
				})
			},
			complete: function () {

			}
		})
	},
	handlerAuthentication:function() {//点击认证
		if(!this.data.enterpriseName||!this.data.legalPerson||!this.data.businessLicenseUrl||!this.data.qualificationUrl) {
			wx.showToast({
				title: '请确认输入信息完整',
				icon: 'none',
			})
			return
		}
		wx.request({
			url: app.globalData.BaseUrl+'enterprise-user-enterpriseUserAudit',
			method: 'POST',
			data: {
				userId: this.data.userId,
				name: this.data.name,
				idCard: this.data.idCard,
				position: this.data.position,
				workCertificateUrl: this.data.workCertificateUrl,
			},
			header: {
				'Authorization': app.globalData.token_type + " " + app.globalData.access_token,
				'content-type': 'application/json' // 默认值
			},
			success: function (res) {
				if(res.statusCode == 200 ||res.statusCode == 201) {
					wx.switchTab({
				    	url: '../main/main'
				    })
					wx.showToast({
						title: '提交成功，请等待审核',
						icon: 'none'
					})
				}else {
					wx.showToast({
						title: res.errMsg,
						icon: 'none'
					})
				}
			},
			fail: function (error) {
				wx.showToast({
						title: error,
						icon: 'none'
				})
			},
			complete: function () {

			}
		})
		
	},

	keyEnterprise:function(e) {//绑定公司输入
		this.setData({
			enterpriseName: e.detail.value
		})
	},
	keyLegal:function(e) {//绑定法人输入
		this.setData({
			legalPerson: e.detail.value
		})
	},
	keyName:function(e) {//绑定姓名输入
		this.setData({
			name: e.detail.value
		})
	},
	keyIdCard:function(e) {//绑定身份证号输入
		this.setData({
			idCard: e.detail.value
		})
	},
	keyPosition:function(e) {//绑定职务输入
		this.setData({
			position: e.detail.value
		})
	},
	chooseImage:function(e) {//选择图片公共
		var self = this
		var key = e.currentTarget.dataset.url
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				wx.showLoading({
					title: '文件上传中...'
				})
				const file = res.tempFilePaths[0]
				wx.uploadFile({
					url: app.globalData.BaseUrl+'upload/images/enterprise',
					method: 'POST',
					name: 'file',
					filePath: file,
					header: {
						'Authorization': app.globalData.token_type + " " + app.globalData.access_token,
						'content-type': 'application/json' // 默认值
					},
					success: function (res) {
						console.log(res)
						wx.hideLoading()
						var img_path = JSON.parse(res.data).pathName
						if(key == 'businessLicenseUrl') {
							self.setData({
								businessLicenseUrl:img_path
							})
						}else if(key == 'qualificationUrl') {
							self.setData({
								qualificationUrl:img_path
							})
						}else if(key == 'workCertificateUrl') {
							self.setData({
								workCertificateUrl:img_path
							})
						}
					},
					fail: function (error) {
          				wx.hideLoading()
          				wx.showToast({
          					title: '上传失败请重试'
          				})
			        },
				})
			}
		})
	},
})