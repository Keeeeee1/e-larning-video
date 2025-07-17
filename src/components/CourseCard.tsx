'use client';

import React from 'react';
import Link from 'next/link';

interface CourseCardProps {
  title: string;
  description: string;
  price?: number;
  videoId?: string;
  duration?: string;
  userCount?: string;
  iconBgColor?: string;
  href?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  title, 
  description, 
  price, 
  videoId, 
  duration, 
  userCount, 
  iconBgColor = 'bg-blue-500',
  href 
}) => {
  const cardContent = (
    <div className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-gray-400 mb-4">{description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              {duration && <span>{duration}</span>}
              {userCount && <span>{userCount}人</span>}
            </div>
            
            {price !== undefined && (
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-blue-500">
                  ¥{price.toLocaleString()}
                </span>
                {videoId && (
                  <Link href={`/videos/${videoId}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
                      詳細を見る
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default CourseCard;
