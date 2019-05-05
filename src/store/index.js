import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
import {
  deepCopy
} from '@/utils/deepCopy'

// import path from '@/utils/path'

Vue.prototype.axios = axios.create({
  // baseURL: '//localhost:8080/',
  timeout: 10000,
  headers: {
    // 'X-Custom-Header': 'wmsHttp'
  },
  withCredentials: true
})

const store = new Vuex.Store({
  state: {
    cardId: null,
  },
  mutations: {
    saveId(state, payload) {
      state.cardId = payload
    }
  },
  actions: {
    // async submitNow(context){  /*测试按钮*/
    //   let result = await axios.get(path.rootUrl)
    //   return deepCopy(result.data)
    // },

  	// async getRights(content , msg){     /*权限管理页面*/
   //    let result = await axios.get(path.rootUrl,{
   //      ...msg
   //    })
   //    return deepCopy(result.data)
   //  },


    // async deleteRow(context,id){      /*权限管理页面 删除按钮*/
    //   /*let result = await axios.post(path.delUrl,{
    //     ...msg
    //   })*/
    //   let result = await axios.delete(path.delUrl,{
    //     emulateJSON: true,
    //     data:id
    //   })
    //   return deepCopy(result.data)
    // },

    // async addRow(context,msg){
    //   let result = await axios.post(path.addUrl,{
    //     ...msg
    //   })
    //   return deepCopy(result.data)
    // }
  }
})
window.store = store
export default store




