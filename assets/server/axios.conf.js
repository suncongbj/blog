import axios from 'axios'
import qs from 'qs'

const baseURL = process.env.NODE_ENV == 'development' ? 'http://39.105.32.55:89' : 'http://39.105.32.55:89'

axios.defaults.timeout = 12000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers['Content-Type'];
axios.defaults.baseURL = baseURL;

//添加一个返回拦截器
axios.interceptors.response.use(function(response){
    //对返回的数据进行一些处理
    if(response.data.code==1){
      //code: 0-ok , 1-no , 2-未登陆
      alert(response.data.msg)
    }
    if(response.data.code==2){
      alert('您尚未登陆，请先登录')
    }
    return response
},function(error){
    //对返回的错误进行一些处理
    console.log(error)
    if (error && error.response) {
    if (error.response.data.error_code != 10003 && error.response.status == 401) {
      //   content: '登录状态失效了~ 重新再登录吧！',
    } else if (error.response.status == 404) {
      //   content: '获取数据失败，请刷新重试',
    } else if (error.response.status == 403) {
      console.log(error.response.status);
      //   content: '403，没有权限访问。',
    } else if (error.response.status == 500) {
      //   content: '获取信息失败，情刷新重试',
    }
  }
    return Promise.reject(error);
});


const fetch = function (url, params,type) {
    console.log(params)
    if(!params){
        params = {}
    }
    return new Promise((resolve, reject) => {
        if(type=='get'){
            axios.get(url, {params:params})
            .then(res => {
                resolve(res.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
        }else{
            axios.post(url, qs.stringify(params))
            .then(res => {
                resolve(res.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
        }
    })
}
export default fetch