
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
import {post,fetch,put,del,uploadFile,quit,delNew} from './utils/http'

Vue.prototype.$delCookie=delCookie;
Vue.prototype.$setCookie=setCookie;
Vue.prototype.$getCookie=getCookie;
Vue.prototype.$getSession=getSession;
Vue.prototype.$setSession=setSession;
Vue.prototype.$delSession=delSession;

Vue.prototype.$path=path;

Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$put=put;
Vue.prototype.$del=del;
Vue.prototype.$uploadFile=uploadFile;
Vue.prototype.$quit=quit;
Vue.prototype.$delNew=delNew;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
