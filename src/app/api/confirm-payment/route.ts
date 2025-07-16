import { NextRequest, NextResponse } from 'next/server'
import stripe from '@/lib/stripe-server'
import { supabaseServer } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, userId } = await request.json()

    if (!paymentIntentId || !userId) {
      return NextResponse.json(
        { error: 'Payment Intent ID and User ID are required' },
        { status: 400 }
      )
    }

    // Stripe から Payment Intent の状態を確認
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === 'succeeded') {
      // 購入ステータスを completed に更新
      const { error: updateError } = await supabaseServer
        .from('purchases')
        .update({ 
          status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('stripe_payment_intent_id', paymentIntentId)
        .eq('user_id', userId)

      if (updateError) {
        console.error('Failed to update purchase status:', updateError)
        return NextResponse.json(
          { error: 'Failed to update purchase status' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Payment confirmed successfully'
      })
    } else {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Payment confirmation failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}