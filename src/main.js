import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'normalize.css';
import ElementUI from 'element-ui';
import koLang from 'element-ui/lib/locale/lang/ko';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, {
	locale: koLang,
});
Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
