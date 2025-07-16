'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

interface Video {
  id: string
  title: string
  price: number
  thumbnail_url: string
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('id, title, price, thumbnail_url')
          .order('created_at', { ascending: false })

        if (error) throw error
        setVideos(data || [])
      } catch (error) {
        console.error('Error fetching videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#131313] flex items-center justify-center text-white">
        <div className="text-lg">Loading videos...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#131313] text-white">
      <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 px-4 sm:px-0">Videos</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <Link href={`/videos/${video.id}`} key={video.id}>
              <div className="bg-[#2a2a2a] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer group">
                <div className="relative">
                  <Image
                    src={video.thumbnail_url || 'https://via.placeholder.com/320x180?text=No+Image'}
                    alt={video.title}
                    width={320}
                    height={180}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-lg font-bold text-blue-500">
                    {formatPrice(video.price)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {videos.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No videos found.</p>
          </div>
        )}
      </main>
    </div>
  )
}