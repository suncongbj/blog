import axios from './config'
import qs from 'qs'
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