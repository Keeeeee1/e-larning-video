'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  const videoId = searchParams.get('videoId')
  const paymentIntentId = searchParams.get('payment_intent')

  useEffect(() => {
    // 認証状態の読み込み中は待機
    if (authLoading) {
      return
    }

    // 認証状態の読み込み完了後、ユーザーがいない場合のみリダイレクト
    if (!user) {
      router.push('/auth')
      return
    }

    if (paymentIntentId && videoId) {
      confirmPayment()
    } else {
      setError('必要な情報が不足しています')
      setLoading(false)
    }
  }, [user, authLoading, paymentIntentId, videoId])

  const confirmPayment = async () => {
    try {
      const response = await fetch('/api/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId,
          userId: user!.id
        })
      })

      const data = await response.json()

      if (data.success) {
        setConfirmed(true)
      } else {
        setError(data.error || '決済の確認に失敗しました')
      }
    } catch (error) {
      console.error('Payment confirmation failed:', error)
      setError('決済確認中にエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg">決済を確認中...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">❌ {error}</div>
          <Link 
            href="/videos"
            className="text-blue-600 hover:text-blue-800"
          >
            動画一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ナビゲーションバー */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-semibold">
                動画学習プラットフォーム
              </Link>
              <Link 
                href="/videos" 
                className="text-gray-600 hover:text-gray-900"
              >
                動画一覧
              </Link>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700">{user?.email}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-6xl mb-8">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            購入が完了しました！
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            講座へのアクセスが有効になりました。今すぐ学習を始めましょう！
          </p>
          
          <div className="space-y-4">
            <Link
              href={`/videos/${videoId}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              講座を視聴する
            </Link>
            
            <div>
              <Link
                href="/videos"
                className="text-blue-600 hover:text-blue-800"
              >
                他の講座も見る
              </Link>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">購入済み講座について</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li>✅ 講座は無制限で視聴可能です</li>
              <li>✅ スマートフォンやタブレットでも視聴できます</li>
              <li>✅ 修了後に認定証書を発行いたします</li>
              <li>✅ 30日間の返金保証付きです</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}