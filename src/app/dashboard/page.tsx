'use client';

import React from 'react';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import Link from 'next/link';
import { ArrowRightIcon, BookOpenIcon, ClockIcon, TrophyIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const DashboardPage = () => {
  const { user } = useAuth();

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-green-600">
                LearnHub
              </Link>
              <nav className="ml-10 flex items-center space-x-8">
                <Link href="/videos" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  コース
                </Link>
                <Link href="/dashboard" className="text-sm font-medium text-gray-900">
                  マイラーニング
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">{user.email}</span>
              <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                おかえりなさい、{user.email?.split('@')[0]}さん
              </h1>
              <p className="text-gray-600">今日も新しいスキルを身につけましょう</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600 font-semibold">7日連続学習中！</span>
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">今月の学習時間</p>
                <p className="text-2xl font-bold text-gray-900">12時間30分</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <ClockIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">完了コース</p>
                <p className="text-2xl font-bold text-gray-900">8コース</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">達成率</p>
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrophyIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">フォーラム参加</p>
                <p className="text-2xl font-bold text-gray-900">23件</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-green-600" />
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

        {/* Recommended Courses */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">おすすめコース</h2>
            <Link href="/videos" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center">
              すべて見る
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">React実践コース</h3>
                  <p className="text-gray-600 mb-3">モダンなWeb開発を学ぶ</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">6時間</span>
                    <span className="text-green-600 font-semibold">無料</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Docker入門</h3>
                  <p className="text-gray-600 mb-3">コンテナ技術の基礎</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">4時間</span>
                    <span className="text-green-600 font-semibold">無料</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI活用入門</h3>
                  <p className="text-gray-600 mb-3">ChatGPTを使いこなす</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">3時間</span>
                    <span className="text-green-600 font-semibold">無料</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">クイックアクセス</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/videos" className="block">
              <div className="bg-green-600 text-white rounded-lg shadow-sm p-6 hover:bg-green-700 transition-colors">
                <div className="flex items-center space-x-4">
                  <BookOpenIcon className="w-8 h-8" />
                  <div>
                    <h3 className="text-lg font-semibold">コースカタログ</h3>
                    <p className="text-green-100">すべてのコースを見る</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/upload" className="block">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">コンテンツ作成</h3>
                    <p className="text-gray-600">新しいコースを作成</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">コミュニティ</h3>
                  <p className="text-gray-600">フォーラムで質問・回答</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;