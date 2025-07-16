import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function DELETE(request: NextRequest) {
  try {
    const { videoId, userId } = await request.json()

    if (!videoId || !userId) {
      return NextResponse.json(
        { error: 'Video ID and User ID are required' },
        { status: 400 }
      )
    }

    // 動画情報を取得
    const { data: video, error: videoError } = await supabaseServer
      .from('videos')
      .select('*')
      .eq('id', videoId)
      .single()

    if (videoError || !video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    // Storageから動画ファイルのパスを抽出
    const videoUrl = video.video_url
    const thumbnailUrl = video.thumbnail_url

    // URLからファイルパスを抽出する関数
    const extractFilePath = (url: string, bucket: string) => {
      const bucketPattern = new RegExp(`/${bucket}/(.+)`)
      const match = url.match(bucketPattern)
      return match ? match[1] : null
    }

    // ファイルパスを取得
    const videoFilePath = extractFilePath(videoUrl, 'videos')
    const thumbnailFilePath = thumbnailUrl ? extractFilePath(thumbnailUrl, 'thumbnails') : null

    // データベースから動画レコードを削除
    const { error: deleteError } = await supabaseServer
      .from('videos')
      .delete()
      .eq('id', videoId)

    if (deleteError) {
      console.error('Database delete failed:', deleteError)
      return NextResponse.json(
        { error: `Database delete failed: ${deleteError.message}` },
        { status: 500 }
      )
    }

    // Storageからファイルを削除
    if (videoFilePath) {
      const { error: videoDeleteError } = await supabaseServer.storage
        .from('videos')
        .remove([videoFilePath])

      if (videoDeleteError) {
        console.error('Video file delete failed:', videoDeleteError)
      }
    }

    if (thumbnailFilePath) {
      const { error: thumbnailDeleteError } = await supabaseServer.storage
        .from('thumbnails')
        .remove([thumbnailFilePath])

      if (thumbnailDeleteError) {
        console.error('Thumbnail file delete failed:', thumbnailDeleteError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Video deleted successfully'
    })

  } catch (error) {
    console.error('Delete failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}