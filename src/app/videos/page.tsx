'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { youtubeVideos, getYouTubeThumbnail } from '@/lib/youtube-videos'
import { MagnifyingGlassIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { StarIcon, CheckBadgeIcon } from '@heroicons/react/20/solid'

export default function VideosPage() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    setTimeout(() => setLoading(false), 300)
  }, [])

  // Get unique tags
  const allTags = Array.from(
    new Set(youtubeVideos.flatMap(video => video.tags))
  )

  // Filter videos based on search and tag
  const filteredVideos = youtubeVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || video.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Loading videos...</div>
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
              <Link href="/auth" className="text-base font-medium text-slate-300 hover:text-white transition-colors duration-200">
                ログイン
              </Link>
              <Link href="/auth" className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-2.5 rounded-lg text-base font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                無料デモを試す
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">ソリューション一覧</h1>
          <p className="text-xl text-slate-300 mb-8">工務店様の課題を解決する最先端のAIソリューション</p>
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="ソリューションを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-sm border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white/20 transition-all duration-300"
            />
            <MagnifyingGlassIcon className="absolute left-5 top-4.5 h-5 w-5 text-slate-400" />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-6 text-lg">ソリューションカテゴリー</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    !selectedTag ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  すべてのソリューション
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedTag === tag ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Solution Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-slate-700 font-medium">
                {filteredVideos.length}件のソリューションを表示中
              </p>
              <select className="border border-slate-300 rounded-lg px-5 py-2.5 text-sm font-medium bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <option>人気順</option>
                <option>新着順</option>
                <option>評価順</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video) => (
                <Link href={`/videos/${video.id}`} key={video.id}>
                  <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={getYouTubeThumbnail(video.youtubeId)}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 right-3 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        人気
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {video.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 line-clamp-2 mb-2 group-hover:text-teal-600 transition-colors duration-200">
                        {video.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4">{video.instructor}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} className="h-4 w-4" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-semibold text-slate-700">5.0</span>
                          <span className="ml-1 text-sm text-slate-500">(1,234)</span>
                        </div>
                        <CheckBadgeIcon className="h-5 w-5 text-teal-600" />
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-sm text-slate-500">{video.duration}</span>
                        <span className="inline-flex items-center text-teal-600 font-semibold text-sm group-hover:text-teal-700">
                          詳細を見る
                          <ChevronRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-500 text-lg">該当するソリューションが見つかりませんでした。</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}