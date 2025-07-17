import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { uploadVideoToS3 } from '@/lib/aws-s3'

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
    const videoKey = `videos/${userId}/${timestamp}_${videoFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const thumbnailKey = thumbnailFile 
      ? `thumbnails/${userId}/${timestamp}_${thumbnailFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      : null

    // 動画ファイルをAWS S3にアップロード
    console.log('Uploading video file to S3:', videoKey)
    
    let videoUrl: string
    try {
      videoUrl = await uploadVideoToS3(videoFile, videoKey)
    } catch (error) {
      console.error('Video upload failed:', error)
      return NextResponse.json(
        { error: `Video upload failed: ${error}` },
        { status: 500 }
      )
    }

    // サムネイルがある場合はアップロード
    let thumbnailUrl = null
    if (thumbnailFile && thumbnailKey) {
      console.log('Uploading thumbnail file to S3:', thumbnailKey)
      
      try {
        thumbnailUrl = await uploadVideoToS3(thumbnailFile, thumbnailKey)
      } catch (error) {
        console.error('Thumbnail upload failed:', error)
        // サムネイルのエラーは致命的ではないので続行
      }
    }

    // 動画情報をFirestoreに保存
    console.log('Saving video metadata to Firestore')
    
    try {
      const videoData = {
        title,
        description: description || '',
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl || `https://via.placeholder.com/320x180?text=${encodeURIComponent(title)}`,
        duration: 0, // 実際の動画時間は別途取得が必要
        category: category || 'その他',
        level: level || '初級',
        price: price || 0,
        instructor_name: instructorName || 'Unknown',
        user_id: userId,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      }
      
      const docRef = await addDoc(collection(db, 'videos'), videoData)
      
      console.log('Video upload completed successfully:', docRef.id)

      return NextResponse.json({
        success: true,
        video: {
          id: docRef.id,
          ...videoData
        },
        videoUrl,
        thumbnailUrl
      })

    } catch (error) {
      console.error('Firestore save failed:', error)
      
      // TODO: データベース保存に失敗した場合、S3からファイルを削除
      
      return NextResponse.json(
        { error: `Database error: ${error}` },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Upload failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}