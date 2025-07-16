import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    console.log('Testing database connection...')
    
    // まずvideosテーブルから1件取得してテスト
    const { data: video, error: videoError } = await supabaseServer
      .from('videos')
      .select('*')
      .limit(1)
      .single()

    console.log('Video test result:', { video, videoError })

    if (videoError) {
      return NextResponse.json({ error: 'Video query failed', details: videoError }, { status: 500 })
    }

    // テスト用の購入レコードを挿入
    const testData = {
      user_id: '00000000-0000-0000-0000-000000000000', // テスト用UUID
      video_id: video.id,
      stripe_payment_intent_id: 'test_intent_' + Date.now(),
      amount: 1000,
      status: 'pending'
    }

    console.log('Inserting test data:', testData)

    const { data: insertResult, error: insertError } = await supabaseServer
      .from('purchases')
      .insert(testData)
      .select()

    console.log('Insert result:', { insertResult, insertError })

    return NextResponse.json({
      success: true,
      video,
      insertResult,
      insertError
    })

  } catch (error) {
    console.error('Test failed:', error)
    return NextResponse.json({ error: 'Test failed', details: error }, { status: 500 })
  }
}