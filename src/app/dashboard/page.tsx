'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRightIcon, BookOpenIcon, ClockIcon, TrophyIcon, ChatBubbleLeftRightIcon, CreditCardIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const searchParams = useSearchParams();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const success = searchParams.get('success');
    
    if (sessionId && success === 'true') {
      checkSubscription(sessionId);
    }
  }, [searchParams]);

  const checkSubscription = async (sessionId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/check-subscription?session_id=${sessionId}`);
      const data = await response.json();
      
      if (data.status === 'paid') {
        setSubscription(data);
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg mb-4 text-gray-900">ダッシュボードにアクセスするにはログインが必要です</div>
          <Link href="/auth" className="text-green-600 hover:text-green-700 font-medium">
            ログインページへ
          </Link>
        </div>
      </div>
    );
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
                <Link href="/videos" className="text-base font-medium text-slate-300 hover:text-white transition-colors duration-200">
                  ソリューション
                </Link>
                <Link href="/dashboard" className="text-base font-medium text-white">
                  ダッシュボード
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-slate-300">{user.email}</span>
              <button 
                onClick={async () => {
                  if (confirm('ログアウトしますか？')) {
                    try {
                      await signOut();
                      window.location.href = '/';
                    } catch (error) {
                      console.error('Logout error:', error);
                      // Firebaseが設定されていない場合でもトップページに戻る
                      window.location.href = '/';
                    }
                  }
                }}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Alert */}
        {subscription && (
          <div className="mb-8 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6">
            <div className="flex items-center">
              <CheckBadgeIcon className="h-12 w-12 text-teal-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  ご登録ありがとうございます！
                </h3>
                <p className="text-slate-700 mt-1">
                  {subscription.planName}プランへのお申し込みが完了しました。
                  14日間の無料トライアル期間をお楽しみください。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  ようこそ、{user.email?.split('@')[0]}様
                </h1>
                <p className="text-lg text-slate-600">BuildAI Proで業務効率を最大化しましょう</p>
              </div>
              <div className="hidden lg:block">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                  プロフェッショナルプラン
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">今月の見積作成数</p>
                <p className="text-3xl font-bold text-slate-900">156件</p>
                <p className="text-xs text-teal-600 mt-1">前月比 +23%</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full">
                <ClockIcon className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">顧客管理数</p>
                <p className="text-3xl font-bold text-slate-900">1,234社</p>
                <p className="text-xs text-teal-600 mt-1">アクティブ顧客</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
                <CheckCircleIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">工程完了率</p>
                <p className="text-3xl font-bold text-slate-900">94.5%</p>
                <p className="text-xs text-teal-600 mt-1">今月の実績</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full">
                <TrophyIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">効率化達成度</p>
                <p className="text-3xl font-bold text-slate-900">+42%</p>
                <p className="text-xs text-teal-600 mt-1">導入前比較</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
                <ShieldCheckIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Learning Progress */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">今月の学習進捗</h3>
            <div className="flex items-center justify-center">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="68, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">68%</div>
                    <div className="text-sm text-gray-500">完了</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center mt-4">目標まで32%</p>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">最近のアクティビティ</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">「Python基礎」レッスンを完了</p>
                  <p className="text-xs text-gray-500">2時間前</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">フォーラムで質問に回答しました</p>
                  <p className="text-xs text-gray-500">4時間前</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">「JavaScript実践」コースを開始</p>
                  <p className="text-xs text-gray-500">1日前</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Solutions */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">ご利用中のソリューション</h2>
            <Link href="/videos" className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center">
              すべてのソリューション
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <BookOpenIcon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">AI見積アシスタント</h3>
                  <p className="text-slate-600 mb-4">今月156件の見積を自動生成</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">利用率: 89%</span>
                    <span className="text-teal-600 font-semibold">アクティブ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <CreditCardIcon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">顧客管理DX</h3>
                  <p className="text-slate-600 mb-4">1,234社の顧客データを管理</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">利用率: 95%</span>
                    <span className="text-teal-600 font-semibold">アクティブ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <TrophyIcon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">工程管理AI</h3>
                  <p className="text-slate-600 mb-4">23件のプロジェクトが進行中</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">利用率: 78%</span>
                    <span className="text-teal-600 font-semibold">アクティブ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Info */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">サブスクリプション情報</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">プロフェッショナルプラン</h3>
                <p className="text-slate-600 mt-1">次回請求日: 2025年2月1日</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-slate-900">¥59,800<span className="text-lg font-normal text-slate-600">/月</span></p>
                <p className="text-sm text-teal-600 mt-1">無料トライアル期間中</p>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <ShieldCheckIcon className="h-8 w-8 text-teal-600" />
                  <div>
                    <p className="font-semibold text-slate-900">すべての機能が利用可能です</p>
                    <p className="text-sm text-slate-600">10ユーザーまで追加可能</p>
                  </div>
                </div>
                <Link
                  href="/account/subscription"
                  className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center"
                >
                  プラン管理
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">クイックアクション</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/estimate/new" className="block">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl shadow-lg p-6 hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold">新規見積作成</h3>
                    <p className="text-teal-100">AIが自動で最適な見積を生成</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/customers" className="block">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">顧客管理</h3>
                    <p className="text-slate-600">顧客情報を一元管理</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/projects" className="block">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">工程管理</h3>
                    <p className="text-slate-600">プロジェクトの進捗を可視化</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;