import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oefelsnvxzlupztoxuii.supabase.co'
const supabaseAnonKey = 'sb_publishable_wjd-l-RNFtk0f46UyUSOdg_fePpoaSy' // Corrected prefix from User Request

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
