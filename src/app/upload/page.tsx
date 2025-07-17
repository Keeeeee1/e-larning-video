'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UploadPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [dragActive, setDragActive] = useState(false)

  // フォームデータ
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'プログラミング',
    level: '初級',
    price: '',
    instructorName: ''
  })

  // ファイル
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg mb-4">動画をアップロードするにはログインが必要です</div>
          <Link href="/auth" className="text-blue-600 hover:text-blue-800">
            ログインページへ
          </Link>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleVideoUpload = (file: File) => {
    if (file.type.startsWith('video/')) {
      setVideoFile(file)
      const url = URL.createObjectURL(file)
      setVideoPreview(url)
      setMessage('')
    } else {
      setMessage('動画ファイルを選択してください')
    }
  }

  const handleThumbnailUpload = (file: File) => {
    if (file.type.startsWith('image/')) {
      setThumbnailFile(file)
      const url = URL.createObjectURL(file)
      setThumbnailPreview(url)
    } else {
      setMessage('画像ファイルを選択してください')
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('video/')) {
        handleVideoUpload(file)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!videoFile) {
      setMessage('動画ファイルを選択してください')
      return
    }

    if (!formData.title.trim()) {
      setMessage('タイトルを入力してください')
      return
    }

    setUploading(true)
    setProgress(0)
    setMessage('アップロード中...')

    try {
      const uploadFormData = new FormData()
      uploadFormData.append('video', videoFile)
      if (thumbnailFile) {
        uploadFormData.append('thumbnail', thumbnailFile)
      }
      uploadFormData.append('title', formData.title)
      uploadFormData.append('description', formData.description)
      uploadFormData.append('category', formData.category)
      uploadFormData.append('level', formData.level)
      uploadFormData.append('price', formData.price || '0')
      uploadFormData.append('instructorName', formData.instructorName || user.email || 'Unknown')
      uploadFormData.append('userId', user.id)

      // プログレス表示のためのシミュレーション
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      const response = await fetch('/api/upload-video', {
        method: 'POST',
        body: uploadFormData
      })

      clearInterval(progressInterval)
      setProgress(100)

      const result = await response.json()

      if (result.success) {
        setMessage('動画のアップロードが完了しました！')
        setTimeout(() => {
          router.push(`/videos/${result.video.id}`)
        }, 2000)
      } else {
        throw new Error(result.error || 'Upload failed')
      }

    } catch (error: any) {
      console.error('Upload failed:', error)
      setMessage(`アップロードに失敗しました: ${error.message}`)
    } finally {
      setUploading(false)
    }
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
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                ダッシュボード
              </Link>
              <Link href="/videos" className="text-gray-600 hover:text-gray-900">
                動画一覧
              </Link>
              <Link href="/upload" className="text-blue-600 font-medium">
                動画アップロード
              </Link>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700">{user.email}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">動画をアップロード</h1>
          <p className="mt-2 text-gray-600">新しい講座動画をプラットフォームに追加します</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 動画ファイルアップロード */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">動画ファイル</h2>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {videoPreview ? (
                <div className="space-y-4">
                  <video
                    src={videoPreview}
                    controls
                    className="max-w-full h-64 mx-auto"
                  />
                  <p className="text-sm text-gray-600">
                    選択済み: {videoFile?.name} ({Math.round((videoFile?.size || 0) / 1024 / 1024)}MB)
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoFile(null)
                      setVideoPreview(null)
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    削除
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-6xl text-gray-400">📹</div>
                  <div>
                    <p className="text-lg">動画ファイルをドラッグ&ドロップ</p>
                    <p className="text-gray-500">または</p>
                    <label className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer">
                      ファイルを選択
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => e.target.files && handleVideoUpload(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">対応形式: MP4, AVI, MOV など（最大500MB）</p>
                </div>
              )}
            </div>
          </div>

          {/* サムネイル */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">サムネイル画像（オプション）</h2>
            
            <div className="flex items-center space-x-4">
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-32 h-24 object-cover rounded"
                />
              )}
              <label className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer">
                {thumbnailFile ? '変更' : '画像を選択'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files && handleThumbnailUpload(e.target.files[0])}
                  className="hidden"
                />
              </label>
              {thumbnailFile && (
                <button
                  type="button"
                  onClick={() => {
                    setThumbnailFile(null)
                    setThumbnailPreview(null)
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  削除
                </button>
              )}
            </div>
          </div>

          {/* 動画情報 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">講座情報</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タイトル *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="講座のタイトルを入力"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  説明
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="講座の内容について説明してください"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  カテゴリー
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                >
                  <option value="プログラミング">プログラミング</option>
                  <option value="デザイン">デザイン</option>
                  <option value="ビジネス">ビジネス</option>
                  <option value="語学">語学</option>
                  <option value="その他">その他</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  レベル
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                >
                  <option value="初級">初級</option>
                  <option value="中級">中級</option>
                  <option value="上級">上級</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  価格 (円)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  講師名
                </label>
                <input
                  type="text"
                  name="instructorName"
                  value={formData.instructorName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="講師名を入力（未入力の場合はメールアドレス）"
                />
              </div>
            </div>
          </div>

          {/* アップロード進行状況 */}
          {uploading && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">アップロード進行状況</h3>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{progress}% 完了</p>
            </div>
          )}

          {/* メッセージ */}
          {message && (
            <div className={`p-4 rounded-md ${
              message.includes('失敗') || message.includes('エラー') 
                ? 'bg-red-100 text-red-700' 
                : message.includes('完了')
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
            }`}>
              {message}
            </div>
          )}

          {/* 送信ボタン */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/videos"
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              キャンセル
            </Link>
            <button
              type="submit"
              disabled={uploading || !videoFile}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md font-medium"
            >
              {uploading ? 'アップロード中...' : 'アップロード開始'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}