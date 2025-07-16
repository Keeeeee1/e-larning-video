import React from 'react';

// 仮のサイドバーコンポーネント
const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900/70 p-6 flex flex-col">
      <div className="text-white text-2xl font-bold mb-10">AI E-learning</div>
      <nav className="flex flex-col space-y-4">
        {/* ここにナビゲーションリンクを追加していきます */}
        <a href="#" className="text-gray-300 hover:text-white bg-gray-700/50 rounded-lg p-3">学習カテゴリ</a>
        <a href="#" className="text-gray-300 hover:text-white">ダッシュボード</a>
        <a href="#" className="text-gray-300 hover:text-white">コース</a>
        <a href="#" className="text-gray-300 hover:text-white">フォーラム</a>
      </nav>
    </aside>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
