'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRightIcon, PlayCircleIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { youtubeVideos } from "@/lib/youtube-videos";

export default function Home() {
  const [email, setEmail] = useState("");

  // Get featured courses (first 3)
  const featuredCourses = youtubeVideos.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-900 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white tracking-tight">
                BuildAI Pro
              </Link>
              <nav className="ml-16 hidden md:flex items-center space-x-12">
                <Link href="/videos" className="text-base font-medium text-slate-300 hover:text-white transition-colors duration-200">
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
              <Link href="/auth" className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-3 rounded-lg text-base font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                無料デモを試す
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Professional gradient background */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 py-32 md:py-40 lg:py-48 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-teal-600/20 to-cyan-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 to-teal-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-8 sm:px-10 lg:px-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-teal-900/50 backdrop-blur-sm px-6 py-3 rounded-full border border-teal-800/50 mb-12">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-teal-300 uppercase tracking-wide">建設業界No.1のAIソリューション</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
            全国の工務店様へ
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              AIで業務を革新
            </span>
          </h1>
          
          <p className="mt-12 text-xl md:text-2xl text-slate-300 leading-relaxed max-w-4xl font-light">
            設計・見積・工程管理をAIで大幅に効率化。
            <br className="hidden sm:block" />
            現場のプロが開発した、使いやすさを追求したシステムで、
            <br className="hidden sm:block" />
            貴社の生産性を最大40%向上させます。
          </p>
          
          <div className="mt-16 flex justify-center">
            <Link
              href="/auth"
              className="group relative bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-12 py-6 text-xl rounded-xl font-bold hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-4 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <span className="relative">無料デモを今すぐ試す</span>
              <ArrowRightIcon className="relative h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              導入実績500社以上
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              14日間の無料トライアル
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              導入サポート無料
            </div>
          </div>
        </div>
      </section>


      {/* Featured Solutions */}
      <section className="py-32 md:py-40 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
              主要ソリューション
            </h2>
            <p className="mt-8 text-xl md:text-2xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
              工務店様の課題を解決する3つの主力製品
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Solution 1 */}
            <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-bl-full"></div>
              <div className="relative p-10">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-8 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  AI見積アシスタント
                </h3>
                <p className="text-slate-600 leading-relaxed mb-8">
                  過去の見積データをAIが学習。新規案件の見積を瞬時に作成し、精度を90%以上に向上させます。
                </p>
                <Link href="/videos" className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 group">
                  詳細を見る
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Solution 2 */}
            <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-bl-full"></div>
              <div className="relative p-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-8 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  顧客管理DX
                </h3>
                <p className="text-slate-600 leading-relaxed mb-8">
                  顧客情報、工事履歴、アフターフォローを一元管理。適切なタイミングでの提案で受注率が30%向上。
                </p>
                <Link href="/videos" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 group">
                  詳細を見る
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Solution 3 */}
            <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-bl-full"></div>
              <div className="relative p-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-8 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  工程管理AI
                </h3>
                <p className="text-slate-600 leading-relaxed mb-8">
                  複数現場の進捗をリアルタイムで可視化。リソースの最適配置で工期遭守率99%を実現。
                </p>
                <Link href="/videos" className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 group">
                  詳細を見る
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-20">
            <Link
              href="/videos"
              className="group inline-flex items-center gap-3 text-lg text-gray-700 font-medium hover:text-gray-900 transition-colors duration-300"
            >
すべてのソリューションを見る
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            工務店業務のDX化を今すぐ始めませんか
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
            まずはお気軽にご相談ください。専門スタッフが貴社に最適なプランをご提案します。
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6 max-w-xl mx-auto">
            <Link
              href="/auth"
              className="group bg-white text-slate-900 px-10 py-5 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-3 text-lg"
            >
              無料相談を申し込む
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/videos"
              className="group bg-transparent text-white border-2 border-white/30 px-10 py-5 rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-3 text-lg"
            >
              導入事例を見る
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1">
              <h3 className="text-2xl font-bold text-white">BuildAI Pro</h3>
              <p className="mt-6 text-slate-400 font-light leading-relaxed">
                工務店様のDX化を支援する
                <br />
                AIソリューション
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">ソリューション</h4>
              <ul className="space-y-4 text-slate-400">
                <li><Link href="/videos" className="hover:text-white transition-colors duration-200">見積もりAI自動化</Link></li>
                <li><Link href="/videos" className="hover:text-white transition-colors duration-200">顧客管理システム</Link></li>
                <li><Link href="/videos" className="hover:text-white transition-colors duration-200">工程管理ツール</Link></li>
                <li><Link href="/videos" className="hover:text-white transition-colors duration-200">業務効率化コンサル</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">サポート</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">ヘルプセンター</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">お問い合わせ</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">よくある質問</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">会社情報</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">会社概要</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">利用規約</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">プライバシーポリシー</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 font-light">
            <p>&copy; 2025 BuildAI Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}