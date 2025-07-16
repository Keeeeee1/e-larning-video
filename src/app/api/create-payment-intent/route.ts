import { NextRequest, NextResponse } from 'next/server'
import stripe from '@/lib/stripe-server'
import { supabaseServer } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { videoId, userId } = await request.json()

    console.log('Received request:', { videoId, userId })

    if (!videoId || !userId) {
      return NextResponse.json(
        { error: 'Video ID and User ID are required' },
        { status: 400 }
      )
    }

    // ユーザーIDの形式をチェック（UUID形式かどうか）
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID format' },
        { status: 400 }
      )
    }

    // 動画情報を取得
    const { data: video, error: videoError } = await supabaseServer
      .from('videos')
      .select('*')
      .eq('id', videoId)
      .single()

    if (videoError || !video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    // 既存の購入レコード（完了済みまたは保留中）をチェック
    const { data: existingPurchase } = await supabaseServer
      .from('purchases')
      .select('*')
      .eq('video_id', videoId)
      .eq('user_id', userId)
      .single()

    if (existingPurchase) {
      if (existingPurchase.status === 'completed') {
        return NextResponse.json(
          { error: 'Video already purchased' },
          { status: 400 }
        )
      }
      
      // 既存のpendingレコードがある場合は削除
      if (existingPurchase.status === 'pending') {
        await supabaseServer
          .from('purchases')
          .delete()
          .eq('id', existingPurchase.id)
        
        console.log('Deleted existing pending purchase record')
      }
    }

    // Stripe Payment Intent を作成
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(video.price * 100), // 円を銭に変換
      currency: 'jpy',
      metadata: {
        videoId,
        userId,
        videoTitle: video.title,
      },
    })

    // 購入レコードを作成（pending状態）
    console.log('Creating purchase record:', {
      user_id: userId,
      video_id: videoId,
      stripe_payment_intent_id: paymentIntent.id,
      amount: video.price,
      status: 'pending'
    })

    const { data: purchaseData, error: purchaseError } = await supabaseServer
      .from('purchases')
      .insert({
        user_id: userId,
        video_id: videoId,
        stripe_payment_intent_id: paymentIntent.id,
        amount: video.price,
        status: 'pending'
      })
      .select()

    console.log('Purchase creation result:', { purchaseData, purchaseError })

    if (purchaseError) {
      console.error('Purchase record creation failed:', purchaseError)
      return NextResponse.json(
        { error: `Failed to create purchase record: ${purchaseError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })

  } catch (error) {
    console.error('Payment intent creation failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}