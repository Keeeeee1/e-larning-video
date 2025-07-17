'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { EnvelopeIcon, LockClosedIcon, BuildingOfficeIcon, CheckIcon } from '@heroicons/react/24/outline'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const { user, signIn, signUp, signInWithGoogle } = useAuth()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (!email || !password) {
      setMessage('メールアドレスとパスワードを入力してください')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage('パスワードは6文字以上で入力してください')
      setLoading(false)
      return
    }

    try {
      if (isLogin) {
        await signIn(email, password)
        setMessage('ログインしました！')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      } else {
        await signUp(email, password)
        setMessage('新規登録が完了しました！')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      }
    } catch (error: any) {
      console.error('認証エラー:', error)
      let errorMessage = 'エラーが発生しました'
      
      if (error.message.includes('auth/invalid-email')) {
        errorMessage = 'メールアドレスの形式が正しくありません'
      } else if (error.message.includes('auth/user-not-found')) {
        errorMessage = 'このメールアドレスは登録されていません'
      } else if (error.message.includes('auth/wrong-password')) {
        errorMessage = 'パスワードが間違っています'
      } else if (error.message.includes('auth/email-already-in-use')) {
        errorMessage = 'このメールアドレスは既に使用されています'
      } else if (error.message.includes('auth/weak-password')) {
        errorMessage = 'パスワードは6文字以上で入力してください'
      } else if (error.message.includes('not initialized')) {
        errorMessage = 'Firebase設定が完了していません。Firebase Console でAuthentication を有効化してください。'
      }
      
      setMessage(errorMessage)
    }
    
    setLoading(false)
  }

  const handleGoogleAuth = async () => {
    try {
      setLoading(true)
      setMessage('')
      await signInWithGoogle()
      setMessage('Googleログインしました！')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } catch (error: any) {
      console.error('Googleログインエラー:', error)
      let errorMessage = 'Googleログインでエラーが発生しました'
      
      if (error.message.includes('not initialized')) {
        errorMessage = 'Firebase設定が完了していません。Firebase Console でAuthentication を有効化してください。'
      }
      
      setMessage(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight">
              BuildAI Pro
            </Link>
            <Link href="/videos" className="text-base font-medium text-slate-300 hover:text-white transition-colors duration-200">
              ソリューション一覧へ
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-4 rounded-2xl shadow-lg">
                  <BuildingOfficeIcon className="h-12 w-12 text-white" />
                </div>
              </div>
              <h2 className="text-center text-3xl font-bold text-slate-900">
                {isLogin ? 'ログイン' : '無料トライアル登録'}
              </h2>
              <p className="mt-2 text-center text-sm text-slate-600">
                {isLogin ? 'アカウントをお持ちでない方は' : '既にアカウントをお持ちの方は'}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-teal-600 hover:text-teal-700 ml-1"
                >
                  {isLogin ? '無料トライアル登録' : 'ログイン'}
                </button>
              </p>
            </div>

            <div className="mt-8 bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10">
            <form className="space-y-6" onSubmit={handleAuth}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  メールアドレス
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  パスワード
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="パスワード（6文字以上）"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {loading ? '処理中...' : (isLogin ? 'ログイン' : '新規登録')}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">または</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  className="w-full flex items-center justify-center py-3 px-4 border border-slate-300 rounded-lg shadow-sm text-base font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    <path fill="none" d="M1 1h22v22H1z"/>
                  </svg>
                  Googleでログイン
                </button>
              </div>
            </div>

            {message && (
              <div className={`mt-4 p-3 rounded-md text-sm ${
                message.includes('エラー') 
                  ? 'bg-red-50 text-red-800 border border-red-200' 
                  : 'bg-green-50 text-green-800 border border-green-200'
              }`}>
                {message}
              </div>
            )}

              <div className="mt-6 text-center text-sm text-slate-600">
                {isLogin && (
                  <Link href="#" className="font-medium text-teal-600 hover:text-teal-700">
                    パスワードをお忘れですか？
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="hidden lg:block relative w-0 flex-1">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
            <div className="relative h-full flex items-center justify-center p-12">
              <div className="max-w-sm">
                <h3 className="text-3xl font-bold text-white mb-8">工務店様のDX化を今すぐ始めましょう</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-teal-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">14日間の無料トライアル</h4>
                      <p className="text-slate-400">すべての機能をお試しいただけます</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-teal-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">導入サポート無料</h4>
                      <p className="text-slate-400">専門スタッフが丁寧にサポート</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-teal-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">クレジットカード不要</h4>
                      <p className="text-slate-400">トライアル期間中の支払いはありません</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 flex items-center">
                  <ShieldCheckIcon className="h-12 w-12 text-teal-400 mr-4" />
                  <div>
                    <p className="text-sm text-slate-400">信頼の実績</p>
                    <p className="text-2xl font-bold text-white">500社以上が導入</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}