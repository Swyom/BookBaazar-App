
import { AppState, Platform } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, processLock } from '@supabase/supabase-js'

const supabaseUrl =  'https://ifwsdaulqxhomdrekikq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmd3NkYXVscXhob21kcmVraWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NTUxNDEsImV4cCI6MjA4MzMzMTE0MX0.Ebm0jls-WZUgQrRIhbPr1DmyxV3wHzJNBShy55j_hFg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    // Removed processLock to avoid lock acquisition issues in React Native environments.
    // If you encounter concurrency issues, consider re-adding it or configuring a lock timeout.
  },
})

if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
}
