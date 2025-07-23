import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Stripeが設定されているかチェック
const isStripeConfigured = process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('your-stripe');

const stripe = isStripeConfigured ? new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
}) : null;

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripeが設定されていません。.env.localファイルにStripeのAPIキーを設定してください。' },
        { status: 500 }
      );
    }

    const { priceId, planName } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.headers.get('origin')}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${request.headers.get('origin')}/?canceled=true`,
      metadata: {
        planName,
      },
      locale: 'ja',
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: `Stripe error: ${err.message}` },
      { status: 500 }
    );
  }
}