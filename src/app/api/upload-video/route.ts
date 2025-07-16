import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const videoFile = formData.get('video') as File
    const thumbnailFile = formData.get('thumbnail') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const level = formData.get('level') as string
    const price = parseFloat(formData.get('price') as string)
    const instructorName = formData.get('instructorName') as string
    const userId = formData.get('userId') as string

    console.log('Upload request received:', {
      videoFile: videoFile?.name,
      thumbnailFile: thumbnailFile?.name,
      title,
      category,
      level,
      price,
      instructorName,
      userId
    })

    // バリデーション
    if (!videoFile || !title || !userId) {
      return NextResponse.json(
        { error: 'Video file, title, and user ID are required' },
        { status: 400 }
      )
    }

    // 動画ファイルの検証
    if (!videoFile.type.startsWith('video/')) {
      return NextResponse.json(
        { error: 'Invalid video file type' },
        { status: 400 }
      )
    }

    // ファイルサイズ制限（500MB）
    const maxSize = 500 * 1024 * 1024 // 500MB
    if (videoFile.size > maxSize) {
      return NextResponse.json(
        { error: 'Video file size must be less than 500MB' },
        { status: 400 }
      )
    }

    // ファイル名を生成（ユーザーID + タイムスタンプ）
    const timestamp = Date.now()
    const videoFileName = `${userId}/${timestamp}_${videoFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const thumbnailFileName = thumbnailFile 
      ? `${userId}/${timestamp}_${thumbnailFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      : null

    // 動画ファイルをSupabase Storageにアップロード
    console.log('Uploading video file:', videoFileName)
    
    const videoBuffer = await videoFile.arrayBuffer()
    const { data: videoUpload, error: videoError } = await supabaseServer.storage
      .from('videos')
      .upload(videoFileName, videoBuffer, {
        contentType: videoFile.type,
        cacheControl: '3600'
      })

    if (videoError) {
      console.error('Video upload failed:', videoError)
      return NextResponse.json(
        { error: `Video upload failed: ${videoError.message}` },
        { status: 500 }
      )
    }

    // サムネイルがある場合はアップロード
    let thumbnailUrl = null
    if (thumbnailFile && thumbnailFileName) {
      console.log('Uploading thumbnail file:', thumbnailFileName)
      
      const thumbnailBuffer = await thumbnailFile.arrayBuffer()
      const { data: thumbnailUpload, error: thumbnailError } = await supabaseServer.storage
        .from('thumbnails')
        .upload(thumbnailFileName, thumbnailBuffer, {
          contentType: thumbnailFile.type,
          cacheControl: '3600'
        })

      if (thumbnailError) {
        console.error('Thumbnail upload failed:', thumbnailError)
        // サムネイルのエラーは致命的ではないので続行
      } else {
        // サムネイルの公開URLを取得
        const { data: thumbnailUrlData } = supabaseServer.storage
          .from('thumbnails')
          .getPublicUrl(thumbnailFileName)
        thumbnailUrl = thumbnailUrlData.publicUrl
      }
    }

    // 動画の公開URLを取得
    const { data: videoUrlData } = supabaseServer.storage
      .from('videos')
      .getPublicUrl(videoFileName)
    const videoUrl = videoUrlData.publicUrl

    // 動画情報をデータベースに保存
    console.log('Saving video metadata to database')
    
    const { data: videoRecord, error: dbError } = await supabaseServer
      .from('videos')
      .insert({
        title,
        description: description || '',
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl || `https://via.placeholder.com/320x180?text=${encodeURIComponent(title)}`,
        duration: 0, // 実際の動画時間は別途取得が必要
        category: category || 'その他',
        level: level || '初級',
        price: price || 0,
        instructor_name: instructorName || 'Unknown'
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database insert failed:', dbError)
      
      // データベース保存に失敗した場合、アップロードしたファイルを削除
      await supabaseServer.storage.from('videos').remove([videoFileName])
      if (thumbnailFileName) {
        await supabaseServer.storage.from('thumbnails').remove([thumbnailFileName])
      }
      
      return NextResponse.json(
        { error: `Database error: ${dbError.message}` },
        { status: 500 }
      )
    }

    console.log('Video upload completed successfully:', videoRecord.id)

    return NextResponse.json({
      success: true,
      video: videoRecord,
      videoUrl,
      thumbnailUrl
    })

  } catch (error) {
    console.error('Upload failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}