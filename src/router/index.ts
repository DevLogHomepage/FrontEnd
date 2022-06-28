import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'HOME',
        component: HomeView
    },
    {
        path: '/tech',
        name: 'TECH',
        component: () => import(/* webpackChunkName: "about" */ '../views/TechView.vue')
    },
    {
        path: '/project',
        name: 'PROJECT',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProjectView.vue')
    },
    {
        path: '/about',
        name: 'ABOUT',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
