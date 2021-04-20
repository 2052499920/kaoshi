// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import Axios from 'axios'
import NProgress from 'nprogress'


import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css'
import '@/assets/css/main.css'
import '@/assets/css/scrollbar.css'
import '@/assets/css/reset.css'
import 'nprogress/nprogress.css'
import 'animate.css'
import 'quill/dist/quill.snow.css';

// import myCharts from './components/myCharts.js'
// Vue.use(myCharts)

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
Vue.component('chart', ECharts)
Vue.prototype.$echarts = ECharts

// 登录拦截
Axios.interceptors.response.use((response) => {
   if(response.data.code == 400) {
      router.replace({
         path: 'login',
      })
   } else {
      return response
   }
 })

// 引用时间格式化
import dates from './utils/date.js';
// 日期格式 yyyy-MM-dd
Vue.filter('date1', function (date) {
   if ([null, undefined].indexOf(date) == -1) {
      if (typeof (date) == 'string') {
         date = new Date(date);
      }

      return dates.formatDate(date, 'yyyy-MM-dd');
   }

   return "";

});
// 日期格式2
Vue.filter('date2', function (date) {
   if ([null, undefined].indexOf(date) == -1) {
      if (typeof (date) == 'string') {
         date = new Date(date);
      }

      return dates.formatDate(date, 'yyyy-MM-dd hh:mm');
   }

   return "";
});

import DropdownPlugin from './m/dropdown'
import NavbarPlugin from './m/navbar'
import ContextMenuPlugin from './m/context-menu'
import MButton from '@/m/button'
import MSwitch from '@/m/switch'
import MAlert from '@/m/alert'
import MCheckbox from '@/m/checkbox'
import MInput from '@/m/input'
import MLoading from '@/m/loading'
import Mkeyboard from '@/m/keyboard'
import MNumberkeyboard from '@/m/number-keyboard'
import MBox from '@/m/box'
import MBackTop from '@/m/back-top'
import MLoader from '@/m/loader'
import MContainer from '@/m/container'
import api from './http/api'


Vue.use(ElementUI)

Vue.use(DropdownPlugin)
Vue.use(NavbarPlugin)
Vue.use(ContextMenuPlugin)
Vue.use(MButton)
Vue.use(MSwitch)
Vue.use(MAlert)
Vue.use(MCheckbox)
Vue.use(MInput)
Vue.use(MLoading)
Vue.use(Mkeyboard)
Vue.use(MNumberkeyboard)
Vue.use(MBox)
Vue.use(MBackTop)
Vue.use(MLoader)
Vue.use(MContainer)



router.afterEach(transition => {
   setTimeout(() => {
      NProgress.done()
   })
})


window.APP_INFO = process.env.APP_INFO

Vue.prototype.$http = Axios
Vue.http = Axios

Vue.prototype.$api = api
Vue.config.productionTip = false

/* eslint-disable no-new */
var app = new Vue({
   el: '#app',
   router,
   template: '<App/>',
   components: { App }
})

window.app = app

