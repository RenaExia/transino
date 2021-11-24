import {
	createRouter,
	createWebHistory
} from 'vue-router'

import Home from '../views/Home.vue'
import detail from '../views/detail.vue'
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

	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
