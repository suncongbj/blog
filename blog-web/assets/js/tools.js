export const getWindowHeight = () => {
	return window.screen.availHeight
}
//判断用户设备ios andriod
export const userPlatform = () => {
	var u = navigator.userAgent;
	if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
	 return 'andriod'
	} else if (u.indexOf('iPhone') > -1) {
		return 'ios'
	}
}

//判断是否在微信内
export const isWeixin = () => {
		var ua = navigator.userAgent.toLowerCase(); 
		if(ua.indexOf('micromessenger') != -1) { 
		    return true; 
		} else { 
		    return false; 
		} 
}

/**
 * 银行家法则的四舍五入
 * @param {Number} number
 * @param {Number} length 小数点后保留的位数
 */
export const toFixd=(number, length)=> {
  number = parseFloat(number)
  let carry = 0 //存放进位标志
  let num, multiple //num为原浮点数放大multiple倍后的数，multiple为10的length次方
  let str = number + '' //将调用该方法的数字转为字符串
  let dot = str.indexOf(".") //找到小数点的位置
  if (str.substr(dot + length + 1, 1) >= 5) carry = 1 //找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1
  multiple = Math.pow(10, length) //设置浮点数要扩大的倍数
  num = Math.floor(number * multiple) + carry //去掉舍入位后的所有数，然后加上我们的手动进位数
  let result = num / multiple + '' //将进位后的整数再缩小为原浮点数
  /*
  * 处理进位后无小数
  */
  dot = result.indexOf(".")
  if (dot < 0) {
    result += '.'
    dot = result.indexOf(".")
  }
  /*
  * 处理多次进位
  */
  let len = result.length - (dot + 1)
  if (len < length) {
    for (let i = 0; i < length - len; i++) {
      result += 0
    }
  }
  return result
}
//存储localStorage
export const setStor = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

//获取localStorage
export const getStor = index => {
	if (!index) return
	return window.localStorage.getItem(index)
}
//删除localStorage
export const removeStor = index => {
	if(!index) return
	window.localStorage.removeItem(index)
}

// json、string转换
export const js2str = json => {
	return JSON.stringify(json)
}
export const str2js = str => {
  let r = null
  try{
    r = JSON.parse(str)
  } catch (e) {
    console.error("str parse to obj fail! str: " + str);
  }
  return r
}

// 手机号正则
export const  checkPhone = num =>{
    if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(num))){
        return false;
    }else{
        return true;
	}
}
//邮箱正则
export const checkEmail = mail=> {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(mail)) {
        return true;
    } else {
        return false;
    } 
}
//密码正则 8到16位 至少包含一个数字一个英文字符
export const checkPassword = str =>{
	let pwdReg = /^(?=.*[a-z])(?=.*\d)[^]{8,16}$/
	if(pwdReg.test(str)){
		return true
	}else{
		return false
	}
}
//时间戳转换 Date.parse(new Date())
export const formatDate = (stamp,t) => {
	let timeStame = new Date(parseInt(stamp));
	let year=timeStame.getFullYear();
	let month=timeStame.getMonth()+1;
	let date=timeStame.getDate();
	let hour=timeStame.getHours();
	let minute=timeStame.getMinutes();
	let second=timeStame.getSeconds();
	switch(t){
		default:
		return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
		case 'y':
		return year;
		case 'm':
		if(month<10){
			month = '0'+month
		}
		return month;
		case 'd':
		if(date<10){
			date = '0'+date
		}
		return date;
		case 'h':
		return hour;
		case 'min':
		return minute;
		case 's':
		return second;
	}
}
//返还url参数对象
export const getUrlObj = ()=>{
	  let url = window.location.href
	  let reg_url = /^[^\?]+\?([\w\W]+)$/
	  let reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g
	  let arr_url = reg_url.exec(url)
	  let ret = {}
	  if (arr_url && arr_url[1]) {
	      let str_para = arr_url[1], result;
	      while ((result = reg_para.exec(str_para)) != null) {
	          ret[result[1]] = result[2]
	      }
	  }
	  return ret
}
//手机号隐匿188****8888
export const mobileConcealment = (n)=>{
	if(typeof n ==='number') {
		n = n+""
	}
	return n.substring(0,3) + '****' + n.substring(7,11)
}
//车牌号验证
export const checkLicense = (n)=>{
	var re = /^([\u4e00-\u9fa5][a-zA-Z](([DF](?![a-zA-Z0-9]*[IO])[0-9]{4})|([0-9]{5}[DF])))|([冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领A-Z]{1}[a-zA-Z0-9]{5}[a-zA-Z0-9挂学警港澳]{1})$/
    if(n.search(re) == -1) {
        return false
    } else {
        return true
    }  
}
// 图片压缩
// path: 图片路径或者base64
// obj: 图片文件
// callback: 回调
export const  canvasDataURL = (path, obj, callback)=>{
    var img = new Image();
    img.src = path;
    img.onload = function(){
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.5;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
    }
}
// 传入filedom生成压缩后的base64
export const fileDomTobase64=(dom,callback)=>{
	let obj = dom.files[0]
	let reader=new FileReader()
	  reader.readAsDataURL(obj)
	  reader.onload=()=>{
	    let path = reader.result
	    var img = new Image();
	    img.src = path;
	    img.onload = function(){
	        var that = this;
	        // 默认按比例压缩
	        var w = that.width,
	            h = that.height,
	            scale = w / h;
	        w = obj.width || w;
	        h = obj.height || (w / scale);
	        var quality = 0.7;  // 默认图片质量为0.7
	        //生成canvas
	        var canvas = document.createElement('canvas');
	        var ctx = canvas.getContext('2d');
	        // 创建属性节点
	        var anw = document.createAttribute("width");
	        anw.nodeValue = w;
	        var anh = document.createAttribute("height");
	        anh.nodeValue = h;
	        canvas.setAttributeNode(anw);
	        canvas.setAttributeNode(anh);
	        ctx.drawImage(that, 0, 0, w, h);
	        // 图像质量
	        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
	            quality = obj.quality;
	        }
	        // quality值越小，所绘制出的图像越模糊
	        var base64 = canvas.toDataURL('image/jpeg', quality);
	        // 回调函数返回base64的值
	        callback(base64);
	    }
	  }
}
//获取url指定参数
export const getUrlParam = (str,url = window.location.href)=>{
	let str1 = url.indexOf(str)
	if(str1!=-1){
		let str2 = url.substring(str1,url.length)
		let str3 = str2.indexOf('=')
		let str4 = str2.substring(str3+1,str2.length)
		let str5 = str4.indexOf('&')
		if(str5!=-1){
			return str4.substring(0,str5)
		}else{
			return str4
		}
	}else{
		return ''
	}
}