import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useUserStore } from '@/store/useAuthStore'

// alles in eine Async-IIFE packen (kompatibel, kein Top-Level await nötig)
    ;(async () => {
    const app = createApp(App)

    // 1) Pinia erstellen und an App hängen
    const pinia = createPinia()
    app.use(pinia)

    // 2) Store *mit* Pinia-Instanz holen und init ausführen
    const userStore = useUserStore(pinia)
    await userStore.init()

    // 3) Router registrieren, warten und mounten
    app.use(router)
    await router.isReady()
    app.mount('#app')
})()
