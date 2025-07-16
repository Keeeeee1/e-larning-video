'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface CheckoutFormProps {
  videoId: string
}

export default function CheckoutForm({ videoId }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !user) {
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setMessage(submitError.message || '決済フォームの送信に失敗しました')
        setIsLoading(false)
        return
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?videoId=${videoId}`,
        },
      })

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message || '決済に失敗しました')
        } else {
          setMessage('予期しないエラーが発生しました')
        }
      }
    } catch (error) {
      console.error('Payment failed:', error)
      setMessage('決済処理中にエラーが発生しました')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      <button
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-md font-medium transition-colors"
      >
        {isLoading ? '処理中...' : '今すぐ購入'}
      </button>
      
      {message && (
        <div className="text-red-600 text-sm">
          {message}
        </div>
      )}

      <div className="text-xs text-gray-500 text-center">
        <p>安全な決済はStripeによって処理されます</p>
        <p>テストカード番号: 4242 4242 4242 4242</p>
      </div>
    </form>
  )
}