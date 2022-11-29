import Vue from 'vue'
import { Button,Select,Row,Col,Input,Divider,Breadcrumb,BreadcrumbItem,Cascader,CascaderPanel,Option,OptionGroup,Form,FormItem,Checkbox,CheckboxButton,CheckboxGroup,RadioGroup,Radio,Loading} from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'




// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.use(Button)
Vue.use(Select)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Divider)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Cascader)
Vue.use(CascaderPanel)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Loading)

//内网穿透用的ip地址
// axios.defaults.baseURL="http://114.132.201.62:3000/api/User"
//本地访问：
axios.defaults.baseURL='http://127.0.0.1:3000/api/User'
Vue.config.productionTip = false
Vue.prototype.$axios=axios


new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
