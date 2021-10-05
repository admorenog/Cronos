import Vue from 'vue'
import axios from 'axios';
import VuePageTitle from 'vue-page-title';
import VueAxios from 'vue-axios';
import vuetify from '@/plugins/vuetify';
import App from '@/App.vue';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

Vue.use(VuePageTitle, { prefix: 'Chronos - ' });

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')
