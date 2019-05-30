const app = getApp()
var authentication = app.getpath +'/api/unified-history-interviewInvitation';
var updateStatus = app.getpath +'/api/unified-history-interviewInvitation/updateStatus';

Page({
	data: {
		page: 1,
		hasMore: true,
		list: [],
	},
	onLoad: function() {
		this.getData()
	},
	getData: function() {
		let self = this
		wx.request({
        url: authentication,
        data: {
        	userId: app.getUserId(),
        	projection: 'info',
        	page: 1,
        	size: 20
        },
        method: 'GET', 
        header: {
        	'Authorization': app.getAuthorization(),
        	'content-type': 'application/json',
        	'access_token': app.getaccess_token()
        },
        success: function (res) {
        	if(res.statusCode == 200) {
        		let page = self.data.page ++
        		self.setData({
        			page: page
        		})
        		if(res.data.page.totalPages == self.data.page || res.data.page.totalElements == 0) {
        			self.setData({
        				hasMore: false
        			})
        		}
        		let list = res.data._embedded.interviewInvitations
        		for(let i = 0 ; i < list.length; i ++) {
        			list[i].positionInfo.jobHighlights = list[i].positionInfo.jobHighlights.split(',')
        			list[i].interviewTime = new Date(Number(list[i].interviewTime)).toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '.')
        			if(list[i].positionInfo.monthlyRangeMin == 0) {
						list[i].money = '面议'
        			}else{
        				list[i].money = list[i].positionInfo.monthlyRangeMin + '-' + list[i].positionInfo.monthlyRangeMax
        			}
        		}
        		list = self.data.list.concat(list)
        		self.setData({
        			list: list
        		})
        	}else{
        		wx.showToast({
        			title: res.data.message,
        			icon: 'none'
        		})
        	}
        }
      })
	},
	acceptRefuse(e) {
		let self = this
		let id = e.currentTarget.dataset.item.id
		let type = e.currentTarget.dataset.type
		let index = e.currentTarget.dataset.index
		wx.request({
	        url: updateStatus,
	        data: {
	        	id: id,
	        	status: type
	        },
	        method: 'POST', 
	        header: {
	        	'Authorization': app.getAuthorization(),
	        	'content-type': 'application/json',
	        	'access_token': app.getaccess_token()
	        },
	        success: function (res) {
	        	if(res.statusCode == 200 || res.statusCode == 201 || res.statusCode == 204) {
	        		wx.showToast({
	        			title: '操作成功！',
	        			icon: 'none'
	        		})
	        		self.setData({
	        			list: [],
	        			page: 1,
	        		})
	        		self.getData()
	        	}else{
	        		wx.showToast({
	        			title: res.data.message,
	        			icon: 'none'
	        		})
	        	}
	        }
	      })
	},
})