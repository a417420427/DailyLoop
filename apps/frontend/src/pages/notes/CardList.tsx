import React from 'react';
import { View } from '@tarojs/components';

interface CardItem {
  id: string | number;
  name: string;
  time: string;
  title: string;
}

interface CardListProps {
  data: CardItem[];
}

const CardList: React.FC<CardListProps> = ({ data }) => {
  const onEnterRecord = (id: number | string) => {
    console.log('进入记录', id);
  }
  return (
    <View className="p-4 bg-gray-50 min-h-screen">
      {data.map(({ id, name, time, title }) => (
        <View
          key={id}
          className="bg-white rounded-lg shadow-md p-4 mb-4"
          onClick={() => onEnterRecord(id)}
        >
          {/* 顶部：名字 和 时间 */}
          <View className="flex justify-between items-center mb-2">
            <View className="text-lg font-semibold text-gray-900">{name}</View>
            <View className="text-sm text-gray-500">{time}</View>
          </View>

          {/* 标题 */}
          <View className="text-gray-700 text-base leading-relaxed">
            {title}
          </View>
        </View>
      ))}
    </View>
  );
};

export default CardList;
