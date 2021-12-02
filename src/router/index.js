import {
	createRouter,
	createWebHistory
} from 'vue-router'

import Home from '../views/Home.vue'
import detail from '../views/detail.vue'
import pop_pdf_page from '../views/pop_pdf_page.vue'
import navbar from '../views/navbar'
const routes = [{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/detail',
		name: 'detail',
		component: detail
		/*component: () => import('../views/About.vue')*/

	},
	{
		path: '/pop_pdf_page',
		name: 'pop_pdf_page',
		component: pop_pdf_page
		/*component: () => import('../views/About.vue')*/
	
	},
	{
		path: '/navbar',
		name: 'navbar',
		component: navbar
		/*component: () => import('../views/About.vue')*/
	
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
