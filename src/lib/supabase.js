import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    // Hilfreiche Fehlermeldung für lokale Entwicklung
    console.error('Umgebungsvariablen fehlen:',
        { VITE_SUPABASE_URL: supabaseUrl, VITE_SUPABASE_ANON_KEY: supabaseAnonKey })
    throw new Error('VITE_SUPABASE_URL oder VITE_SUPABASE_ANON_KEY ist nicht definiert. ' +
        'Stelle sicher, dass .env.local im Projekt-Root liegt, die Variablen mit VITE_ beginnen ' +
        'und der Vite-Dev-Server nach Änderungen neu gestartet wurde (npm run dev).')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

