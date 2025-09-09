// src/stores/user.ts
import {defineStore} from 'pinia'
import type {Session, User} from '@supabase/supabase-js'
import {supabase} from '@/lib/supabase'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        session: null as Session | null,
        isAuthenticated: false,
        authError: null as string | null,
        isLoading: false,
    }),
    getters: {
        accessToken: (s) => s.session?.access_token ?? null,
    },
    actions: {
        // beim App-Start aufrufen (z. B. in main.ts)
        async init() {
            const {data, error} = await supabase.auth.getSession()
            if (error) this.authError = error.message
            this.session = data.session
            this.user = data.session?.user ?? null
            this.isAuthenticated = !!data.session
            // Hält Session/Token aktuell (Auto-Refresh etc.)
            supabase.auth.onAuthStateChange((_event, session) => {
                this.session = session
                this.user = session?.user ?? null
                this.isAuthenticated = !!session
            })
        },
        setUser(user: User | null) {
            this.user = user
            this.isAuthenticated = !!user
        },
        async logUserIn(email: string, password: string) {
            this.isLoading = true
            this.authError = null
            const {data, error} = await supabase.auth.signInWithPassword({email, password})
            this.isLoading = false
            if (error) {
                this.authError = error.message
                this.user = null
                this.session = null
                this.isAuthenticated = false
                return false
            }
            // Tokens sind in data.session enthalten und werden vom SDK intern verwaltet
            this.session = data.session
            this.user = data.user
            this.isAuthenticated = true
            return true
        },
        async logUserOut() {
            await supabase.auth.signOut()
            this.user = null
            this.session = null
            this.isAuthenticated = false
            this.authError = null
        },
    },
})
