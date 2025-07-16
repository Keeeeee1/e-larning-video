'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

interface Video {
  id: string
  title: string
  description: string
  video_url: string
  thumbnail_url: string
  duration: number
  category: string
  level: string
  price: number
  instructor_name: string
  created_at: string
}

export default function VideoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPurchased, setIsPurchased] = useState(false)
  const [checkingPurchase, setCheckingPurchase] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchVideo(params.id as string)
    }
  }, [params.id])

  useEffect(() => {
    if (video && user) {
      checkPurchaseStatus()
    }
  }, [video, user])

  const checkPurchaseStatus = async () => {
    if (!video || !user) return
    
    setCheckingPurchase(true)
    try {
      const response = await fetch(`/api/check-purchase?videoId=${video.id}&userId=${user.id}`)
      const data = await response.json()
      setIsPurchased(data.isPurchased)
    } catch (error) {
      console.error('Purchase check failed:', error)
    } finally {
      setCheckingPurchase(false)
    }
  }

  const fetchVideo = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setVideo(data)
    } catch (error: any) {
      console.error('動画の取得に失敗しました:', error)
      setError('動画が見つかりませんでした')
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}時間${minutes}分`
    }
    return `${minutes}分`
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price)
  }

  const getEmbedUrl = (url: string) => {
    // YouTube URLを埋め込み用に変換
    if (url.includes('youtube.com/embed/')) {
      return url
    }
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">動画を読み込み中...</div>
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
                href="/dashboard" 
                className="text-gray-600 hover:text-gray-900"
              >
                ダッシュボード
              </Link>
              <Link 
                href="/videos" 
                className="text-gray-600 hover:text-gray-900"
              >
                動画一覧
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <span className="text-gray-700">{user.email}</span>
              ) : (
                <Link 
                  href="/auth"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  ログイン
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* パンくずリスト */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/videos" className="text-blue-600 hover:text-blue-800">
                  動画一覧
                </Link>
              </li>
              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li>
                <span className="text-gray-900">{video.title}</span>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 動画プレイヤー */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src={getEmbedUrl(video.video_url)}
                    title={video.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {video.title}
                  </h1>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      video.level === '初級' ? 'bg-green-100 text-green-800' :
                      video.level === '中級' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {video.level}
                    </span>
                    <span className="text-gray-600">
                      {video.category}
                    </span>
                    <span className="text-gray-600">
                      {formatDuration(video.duration)}
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">講座内容</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">講師情報</h4>
                    <p className="text-gray-600">{video.instructor_name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  {formatPrice(video.price)}
                </div>
                
                {user ? (
                  <div className="space-y-4">
                    {isPurchased ? (
                      <div className="text-center">
                        <div className="bg-green-100 text-green-800 py-3 px-4 rounded-md font-medium mb-2">
                          ✅ 購入済み
                        </div>
                        <p className="text-sm text-gray-600">
                          この講座は無制限で視聴できます
                        </p>
                      </div>
                    ) : (
                      <Link
                        href={`/checkout/${video.id}`}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors block text-center"
                      >
                        {checkingPurchase ? '確認中...' : 'この講座を購入'}
                      </Link>
                    )}
                    <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-md font-medium transition-colors">
                      お気に入りに追加
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-600 text-sm">
                      この講座を購入するにはログインが必要です
                    </p>
                    <Link
                      href="/auth"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors block text-center"
                    >
                      ログイン / 新規登録
                    </Link>
                  </div>
                )}
                
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-3">この講座に含まれるもの</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {formatDuration(video.duration)}の動画コンテンツ
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      スマートフォンやタブレットでも視聴可能
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      修了後の認定証書
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      30日間の返金保証
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}