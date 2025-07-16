import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get('videoId')
    const userId = searchParams.get('userId')

    if (!videoId || !userId) {
      return NextResponse.json(
        { error: 'Video ID and User ID are required' },
        { status: 400 }
      )
    }

    // 購入済みかチェック
    const { data: purchase, error } = await supabaseServer
      .from('purchases')
      .select('*')
      .eq('video_id', videoId)
      .eq('user_id', userId)
      .eq('status', 'completed')
      .single()

    return NextResponse.json({
      isPurchased: !!purchase,
      purchase: purchase || null
    })

  } catch (error) {
    console.error('Purchase check failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}