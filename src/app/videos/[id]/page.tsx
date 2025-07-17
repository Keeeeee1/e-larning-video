'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { getYouTubeVideoById } from '@/lib/youtube-videos'
import type { YouTubeVideo } from '@/lib/youtube-videos'
import { ArrowLeftIcon, PlayIcon, ClockIcon, DocumentTextIcon, AcademicCapIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/solid'

export default function VideoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [video, setVideo] = useState<YouTubeVideo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      const videoData = getYouTubeVideoById(params.id as string)
      if (videoData) {
        setVideo(videoData)
      } else {
        setError('動画が見つかりませんでした')
      }
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">動画を読み込み中...</div>
      </div>
    )
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-4">{error || '動画が見つかりませんでした'}</div>
          <Link 
            href="/videos"
            className="text-green-600 hover:text-green-700"
          >
            動画一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white tracking-tight">
                BuildAI Pro
              </Link>
              <nav className="ml-16 hidden md:flex items-center space-x-12">
                <Link href="/videos" className="text-base font-medium text-white">
                  ソリューション
                </Link>
                <Link href="/dashboard" className="text-base font-medium text-slate-300 hover:text-white transition-colors duration-200">
                  導入事例
                </Link>
                <Link href="/" className="text-base font-medium text-slate-300 hover:text-white transition-colors duration-200">
                  料金プラン
                </Link>
                <Link href="/" className="text-base font-medium text-slate-300 hover:text-white transition-colors duration-200">
                  サポート
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-8">
              {user ? (
                <span className="text-slate-300">{user.email}</span>
              ) : (
                <>
                  <Link href="/auth" className="text-base font-medium text-slate-300 hover:text-white transition-colors duration-200">
                    ログイン
                  </Link>
                  <Link href="/auth" className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-2.5 rounded-lg text-base font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                    無料デモを試す
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Video Player Section */}
        <div className="bg-slate-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/videos"
              className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              ソリューション一覧に戻る
            </Link>
            
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Solution Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  {video.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 mb-8 text-slate-600">
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2 text-slate-400" />
                    <span>{video.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="h-5 w-5 mr-2 text-slate-400" />
                    <span>提供: {video.instructor}</span>
                  </div>
                  <div className="flex items-center">
                    <ShieldCheckIcon className="h-5 w-5 mr-2 text-teal-600" />
                    <span className="text-teal-600 font-semibold">導入実績500社以上</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {video.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-slate-100 text-slate-700 text-sm px-4 py-2 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <DocumentTextIcon className="h-6 w-6 mr-3 text-teal-600" />
                    ソリューション概要
                  </h2>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">
                    {video.description}
                  </p>
                </div>

                {/* Key Features */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 mb-10">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                    <AcademicCapIcon className="h-6 w-6 mr-3 text-teal-600" />
                    このソリューションの特徴
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-900">現場のプロが開発</h4>
                        <p className="text-slate-600">工務店様の実際の課題を熟知したプロが設計</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-900">即時導入可能</h4>
                        <p className="text-slate-600">百間無しでビジネスに即座に導入できるソリューション</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-900">24/7サポート</h4>
                        <p className="text-slate-600">いつでも専門スタッフによるサポートが受けられます</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-900">成果保証</h4>
                        <p className="text-slate-600">導入後3ヶ月以内に業務効率が40%以上向上</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-slate-900">今すぐ始める</div>
                    <p className="text-slate-600 mt-2">14日間の無料トライアル</p>
                  </div>
                  <Link
                    href="/auth"
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-4 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center block mb-4"
                  >
                    無料デモを申し込む
                  </Link>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white border-2 border-slate-300 text-slate-700 px-6 py-4 rounded-lg font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 inline-flex items-center justify-center"
                  >
                    <PlayIcon className="h-5 w-5 mr-2" />
                    デモ動画を観る
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">安心・安全の保証</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <ShieldCheckIcon className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-sm text-slate-700">セキュリティ認証取得済み</span>
                    </div>
                    <div className="flex items-center">
                      <ShieldCheckIcon className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-sm text-slate-700">99.9%の稼働率保証</span>
                    </div>
                    <div className="flex items-center">
                      <ShieldCheckIcon className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-sm text-slate-700">返金保証あり</span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-slate-100 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-900 mb-3">お問い合わせ</h4>
                  <p className="text-sm text-slate-600 mb-3">導入に関するご相談はお気軽に</p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-slate-900">電話: 0120-XXX-XXX</p>
                    <p className="text-sm text-slate-600">平日 9:00-18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}