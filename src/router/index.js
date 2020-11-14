import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: '수지구,기흥구 아파트 월별 실거래가 검색',
		},
	},
	{
		path: '/DashBoard',
		name: 'DashBoard',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "DashBoard" */ '../views/DashBoard.vue'),
		meta: {
			title: '수지구,기흥구 아파트 2019년 2020년 실거래가 검색',
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
