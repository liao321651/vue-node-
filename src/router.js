import Vue from 'vue'
import Router from 'vue-router'

import home_page from './components/home_page/home_page.vue'
import logo from './components/logo/logo.vue'
import center from './components/logo/center.vue'
import newly_build from './components/Newly_build/Newly_build.vue'


Vue.use(Router);
export default  new Router({
    routes: [
        { path: '*', name: 'home_page', component: home_page},
        { path: '/logo', name: 'logo', component: logo},
        { path: '/center', name: 'center', component: center },
        { path: '/newly_build', name: 'newly_build', component: newly_build },
    ]
    
})