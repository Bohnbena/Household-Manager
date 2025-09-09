// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import login from '../pages/login.vue'
import home from '../pages/home.vue'
// router/index.ts (nach Router-Erstellung, vor Export)
import { useUserStore } from '@/store/useAuthStore'

const routes = [
    // Beispielroute
    { path: '/', component: login, name: 'login'},
    { path: '/home', component: home, meta: { requiresAuth: true }, name: 'home' },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
    const userStore = useUserStore()                // Pinia ist bereits aktiv (du hast es in main.ts vor Router genutzt)
    const isAuthed = userStore.isAuthenticated
    const needsAuth = to.meta.requiresAuth === true
    if (needsAuth && !isAuthed) {
        return { path: '/' }
    }
})


export default router