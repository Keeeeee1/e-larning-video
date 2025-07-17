'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Elements } from '@stripe/react-stripe-js'
import getStripe from '@/lib/stripe'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import CheckoutForm from '@/components/CheckoutForm'
import Link from 'next/link'

interface Video {
  id: string
  title: string
  description: string
  price: number
  instructor_name: string
  thumbnail_url: string
  duration: number
  level: string
}

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth')
      return
    }

    if (params.videoId && user) {
      fetchVideoAndCreatePaymentIntent(params.videoId as string)
    }
  }, [params.videoId, user, authLoading])

  const fetchVideoAndCreatePaymentIntent = async (videoId: string) => {
    try {
      if (!db) {
        setError('データベースが初期化されていません')
        return
      }

      // 動画情報を取得
      const videoDoc = doc(db, 'videos', videoId)
      const videoSnap = await getDoc(videoDoc)

      if (!videoSnap.exists()) {
        setError('動画が見つかりませんでした')
        return
      }

      const videoData = {
        id: videoSnap.id,
        ...videoSnap.data()
      } as Video

      setVideo(videoData)

      // 既に購入済みかチェック
      const response = await fetch(`/api/check-purchase?videoId=${videoId}&userId=${user!.id}`)
      const { isPurchased } = await response.json()

      if (isPurchased) {
        router.push(`/videos/${videoId}`)
        return
      }

      // Payment Intent を作成
      const paymentResponse = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId,
          userId: user!.id
        })
      })

      const { clientSecret: secret, error: paymentError } = await paymentResponse.json()

      if (paymentError) {
        setError(paymentError)
        return
      }

      setClientSecret(secret)
    } catch (error) {
      console.error('Checkout initialization failed:', error)
      setError('決済の初期化に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price)
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}時間${minutes}分`
    }
    return `${minutes}分`
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    )
  }

  if (error || !video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-4">{error || '動画が見つかりませんでした'}</div>
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

  const stripePromise = getStripe()

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#2563eb',
    },
  }

  const options = {
    clientSecret,
    appearance,
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
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">講座を購入</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 講座情報 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <img
                src={video.thumbnail_url || 'https://via.placeholder.com/400x225?text=No+Image'}
                alt={video.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
              <p className="text-gray-600 mb-4">{video.description}</p>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>講師:</span>
                  <span>{video.instructor_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>再生時間:</span>
                  <span>{formatDuration(video.duration)}</span>
                </div>
                <div className="flex justify-between">
                  <span>レベル:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    video.level === '初級' ? 'bg-green-100 text-green-800' :
                    video.level === '中級' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {video.level}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-blue-600 pt-2 border-t">
                  <span>価格:</span>
                  <span>{formatPrice(video.price)}</span>
                </div>
              </div>
            </div>

            {/* 決済フォーム */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">お支払い情報</h3>
              
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm videoId={video.id} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}