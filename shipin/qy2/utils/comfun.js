var store = require('./store.js')
var config = require('./config.js')
module.exports = {
  getEnity:function(){
    var data={
      'grant_type':'password',
      'password':'123456',
      'username':'15032992879',
      'userType':'enterprise'
    }
    wx.request({
      url: 'http://shipinzp.com:8081/oauth/token', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: data,
      header: {
        'Authorization':'Basic d2ViYXBwOjg4ODg=',
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res);
       var tokenarray= res.data.access_token.split(".");
      var tokenone= comfun.base64_decode(tokenarray[1]);
      var enterprise= JSON.parse(tokenone.substring(0,tokenone.length-1))
      wx.setStorageSync('enterprise', enterprise)
        debugger;
        wx.hideLoading();
      //  resolve(res.data)
      },
      fail: function (error) {
        wx.hideLoading();
       // reject(false)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  getLocation: function(cb){
    var location = store.location 
    if(location){
      cb(location)
      return;
    }
    wx.getLocation({
      success: function (res) {
        var locationParam = res.latitude + ',' + res.longitude
        fetch('https://api.map.baidu.com/geocoder/v2/?ak=' + config.baiduAK + '&location=' + locationParam + '1&output=json&pois=1').then(function(response){
          response.json().then(function(data){
            store.location = data.result
            cb(data.result)
          })
        })
      }
    })
  },
  getCity: function(cb){
    this.getLocation(function(location){
      cb(location.addressComponent.city.replace('市', ''))
    })
  },
  fetchFilms: function(url, city, start, count, cb){
    var that = this
    fetch(url + '?city=' + city + '&start=' + start + '&count=' + count).then(function(response){
      response.json().then(function(data){
        if(data.subjects.length === 0){
          that.setData({
            hasMore: false,
          })
        }else{
          that.setData({
            films: that.data.films.concat(data.subjects),
            start: that.data.start + data.subjects.length
          })
        }
        cb(data)
      })
    })
  },

  base64_encode: function(str) { // 编码，配合encodeURIComponent使用
    var c1, c2, c3;
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var i = 0, len = str.length, strin = '';
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            strin += base64EncodeChars.charAt(c1 >> 2);
            strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
            strin += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            strin += base64EncodeChars.charAt(c1 >> 2);
            strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
            strin += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        strin += base64EncodeChars.charAt(c1 >> 2);
        strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        strin += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        strin += base64EncodeChars.charAt(c3 & 0x3F)
    }
    return strin
}, 
base64_decode:function(input) { // 解码，配合decodeURIComponent使用
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
    return store.utf8_decode(output);
}
}