import { createClient } from '@supabase/supabase-js'

// クライアントを生成する関数をエクスポートする
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(supabaseUrl, supabaseAnonKey)
}

// 既存のコードとの互換性のために、デフォルトのクライアントもエクスポートしておく
export const supabase = createSupabaseClient()