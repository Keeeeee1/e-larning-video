import React from 'react';
import CourseCard from '@/components/CourseCard'; // 作成したCourseCardをインポート

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4">おかえりなさい、田中さん</h1>
      <p className="text-gray-400 mb-10">今日もEラーニングで新しい知識を学習しましょう</p>

      {/* AIおすすめコースセクション */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6">AIおすすめコース</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard
            title="段取り力UP講座"
            description="最短で最大の成果を出す"
            duration="45分"
            userCount="2134人"
            iconBgColor="bg-purple-500"
          />
          <CourseCard
            title="コスト削減AIの活用"
            description="固定コストを削減し大幅に利益を出す方法"
            duration="60分"
            userCount="-" // Figmaデザインに合わせて
            iconBgColor="bg-green-500"
          />
          <CourseCard
            title="経営者向けチャットボット"
            description="自社開発もできるチャットシステム構築"
            duration="2週間"
            userCount="-" // Figmaデザインに合わせて
            iconBgColor="bg-pink-500"
          />
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;