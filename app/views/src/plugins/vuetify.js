import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: '#ff6633',
                accent: '#ff4411',
            },
            dark: {
                primary: '#ff6633',
                accent: '#ff4411',
                background: '#333333'
            },
        },
    },
});
