import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    return NextResponse.json({
      status: session.payment_status,
      customerEmail: session.customer_email,
      planName: session.metadata?.planName || '',
    });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: `Error retrieving session: ${err.message}` },
      { status: 500 }
    );
  }
}