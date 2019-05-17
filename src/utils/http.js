import axios from 'axios';
import qs from 'qs';
import {getSession} from './cookie'
import router from '../router'

import { Message } from 'element-ui';

axios.defaults.timeout = 20000;
axios.defaults.baseURL ='';

var appkey = 'b5c5eb8f-c038-11e7-b9fb-00163e13e7f3';
var ua = navigator.userAgent.toLowerCase();
var ua2 = window.navigator.userAgent.toLowerCase();

//本地
// var https='';

////测试环境
  var https='http://192.168.1.193:8088';

//正式环境
// var https='https://admin.bzlyplay.com';

// var https='http://103.44.31.228:8088';


axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // config.data.append("channelCode",getSession("channelCode"));
    if(config.method=='post' || config.method=='put'){
      if(config.url == '/api/upload'){
        config.data.append("channel",getSession("channelCode"));
        // config.data.append("app_key",appkey);
        // config.data.append("sign",getSession("sign"));
        // config.data.append("user_agent",ua);
        config.headers['Content-Type'] = 'multipart\n' +
          '        config.data.append("token",getSession("token"));/form-data';
      }else{
        config.data = {
          ...config.data,
          // app_key: appkey,
          token: getSession("token"),
          channel:getSession("channelCode"),
          // sign: getSession("sign"),
          // user_agent: ua
        }
        config.data = qs.stringify(config.data)
      }
    }else if(config.method=='get'){
      config.params = {
        // app_key: appkey,
        token: getSession("token"),
        channel:getSession("channelCode"),
        // sign: getSession("sign"),
        // user_agent: ua,
        ...config.params
      }
      config.paramsSerializer=function(params) {
        return  qs.stringify(config.params)
      }

    }else if(config.method =='delete'){
      config.params = {
        // app_key: appkey,
        token: getSession("token"),
        channel:getSession("channelCode"),
        // sign: getSession("sign"),
        // user_agent: ua,
        ...config.params
      }
      config.paramsSerializer=function(params) {
        return  qs.stringify(config.params)
      }
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
    if(response.data.statusCode ==3001 || response.data.statusCode ==3102){
      router.push({
        path:'/',
        querry:{redirect:router.currentRoute.fullPath}
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(https+url,{
      params:params,
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}
 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(https+url,data,{
            emulateJSON: true
          }).then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(https+url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
          axios.post(https+url,data,{
            emulateJSON: true
          }).then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

export function del(url){
  return new Promise((resolve,reject) => {
          axios.delete(https+url).then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

export function delNew(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.delete(url,{data:data}).then(response => {
     resolve(response.data);
   },err => {
     reject(err)
   })
})
}

export function uploadFile(url,data){
  return new Promise((resolve,reject) => {
          axios.post(https+url,data).then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

export function quit(url,data = {}){
  return new Promise((resolve,reject) => {
          axios.put(https+url,data,{
            emulateJSON: true
          }).then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}
