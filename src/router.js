import Vue from 'vue'
import vueRouter from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

Vue.use(vueRouter)

export default new vueRouter({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/about',
			name: 'about',
			component: About
		}
	]
})