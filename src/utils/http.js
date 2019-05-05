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
var https='';
var httpsTask='';

////测试环境
//  var https='http://192.168.1.193:8088';
//  var httpsTask='http://192.168.1.193:8088';

//正式环境
// var httpsTask='https://admin.bzlyplay.com';
// var https='https://admin.bzlyplay.com';

axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if(config.method=='post' || config.method=='put'){
      if(config.url == '/api/upload'){
        config.data.append("app_key",appkey);
        config.data.append("sign",getSession("sign"));
        config.data.append("user_agent",ua);
        config.headers['Content-Type'] = 'multipart\n' +
          '        config.data.append("token",getSession("token"));/form-data';
      }else{
        config.data = {
          ...config.data,
          app_key: appkey,
          token: getSession("token"),
          sign: getSession("sign"),
          user_agent: ua
        }
        config.data = qs.stringify(config.data)
      }
    }else if(config.method=='get'){
      config.params = {
        app_key: appkey,
        token: getSession("token"),
        sign: getSession("sign"),
        user_agent: ua,
        ...config.params
      }
      config.paramsSerializer=function(params) {
        return  qs.stringify(config.params)
      }

    }else if(config.method =='delete'){
      config.params = {
        app_key: appkey,
        token: getSession("token"),
        sign: getSession("sign"),
        user_agent: ua,
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
  if(url.indexOf("/task") != -1){
    url=httpsTask+url;
  }else{
    url=https+url;
  }
  return new Promise((resolve,reject) => {
    axios.get(url,{
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
  if(url.indexOf("/task") != -1){
    url=httpsTask+url;
  }else{
    url=https+url;
  }
   return new Promise((resolve,reject) => {
     axios.post(url,data,{
            emulateJSON: true
          }).then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

export function patch(url,data = {}){
   if(url.indexOf("/task") != -1){
     url=httpsTask+url;
   }else{
     url=https+url;
   }
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

export function put(url,data = {}){
   if(url.indexOf("/task") != -1){
     url=httpsTask+url;
   }else{
     url=https+url;
   }
  return new Promise((resolve,reject) => {
          axios.post(url,data,{
            emulateJSON: true
          }).then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

export function del(url){
   if(url.indexOf("/task") != -1){
     url=httpsTask+url;
   }else{
     url=https+url;
   }
  return new Promise((resolve,reject) => {
          axios.delete(url).then(response => {
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
  if(url.indexOf("/task") != -1){
    url=httpsTask+url;
  }else{
    url=https+url;
  }
  return new Promise((resolve,reject) => {
          axios.post(url,data).then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

export function quit(url,data = {}){
  if(url.indexOf("/task") != -1){
    url=httpsTask+url;
  }else{
    url=https+url;
  }
  return new Promise((resolve,reject) => {
          axios.put(url,data,{
            emulateJSON: true
          }).then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}
