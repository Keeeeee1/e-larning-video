'use client';

import React from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  price: number;
  videoId: string; // 動画IDを追加
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, price, videoId }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">${price}</span>
        {/* ここに購入ボタンなどのロジックを追加 */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => alert(`購入機能はまだ実装されていません。動画ID: ${videoId}`)}
        >
          購入する
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
