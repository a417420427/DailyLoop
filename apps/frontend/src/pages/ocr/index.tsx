// src/pages/index/index.tsx
import React from 'react';

const Home: React.FC = () => {
  const cards = [
    { title: '图片文字识别', description: '识别图片中的文字内容', icon: '🖼️', color: 'from-purple-400 to-indigo-600' },
    { title: '扫码', description: '扫描二维码或条形码', icon: '📷', color: 'from-green-400 to-teal-600' },
    { title: '文档抽取', description: '提取文档中的关键信息', icon: '📄', color: 'from-yellow-400 to-orange-500' },
    { title: '历史记录', description: '查看之前的操作记录', icon: '📜', color: 'from-pink-400 to-red-500' },
  ];

  return (
    <view className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-200 p-6">
      <view className="max-w-3xl mx-auto grid grid-cols-2 gap-6">
        {cards.map(({ title, description, icon, color }) => (
          <view
            key={title}
            className={`bg-white rounded-xl shadow-lg p-6 flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105 hover:shadow-2xl`}
          >
            <view className={`w-16 h-16 mb-4 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-3xl text-white shadow-md`}>
              {icon}
            </view>
            <view className="text-xl font-semibold mb-2 text-gray-800">{title}</view>
            <view className="text-gray-500 text-center text-sm leading-relaxed">{description}</view>
          </view>
        ))}
      </view>
    </view>
  );
};

export default Home;
