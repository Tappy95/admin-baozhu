
// import Vue from 'vue'
import App from './App'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

import router from './router'
import store from './store'
import $ from 'jquery'



import path from './utils/path'
import {delCookie,setCookie,getCookie,getSession,setSession,delSession} from './utils/cookie'
import {fetchlocal,postlocal,post,fetch,put,del,uploadFile,quit,delNew,newPlatformGet} from './utils/http'

Vue.prototype.$delCookie=delCookie;
Vue.prototype.$setCookie=setCookie;
Vue.prototype.$getCookie=getCookie;
Vue.prototype.$getSession=getSession;
Vue.prototype.$setSession=setSession;
Vue.prototype.$delSession=delSession;

Vue.prototype.$path=path;

Vue.prototype.$postlocal=postlocal;
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$fetchlocal=fetchlocal;
Vue.prototype.$newPlatformGet=newPlatformGet;
Vue.prototype.$put=put;
Vue.prototype.$del=del;
Vue.prototype.$uploadFile=uploadFile;
Vue.prototype.$quit=quit;
Vue.prototype.$delNew=delNew;

Vue.prototype.$patternNum1 = /^[0-9]*$/; //请输入请输入正整数
Vue.prototype.$patternNum2 = /^(0|[1-9][0-9]*)(\.\d+)?$/; //请输入正数
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
