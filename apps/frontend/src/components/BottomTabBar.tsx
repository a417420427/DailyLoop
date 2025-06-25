import React, { useMemo } from 'react';
import { Image, Navigator, Text, View } from '@tarojs/components';

import HistoryIcon from '@/src/assets/icons/history.png';
import homeIcon from '@/src/assets/icons/home.png';
import NotesIcon from '@/src/assets/icons/notes.png';
import { useRouter } from '@tarojs/taro';

type TabItem = {
  key: string;
  title: string;
  icon: string; // 图标路径
  url: string; // 跳转路径
};

type BottomTabBarProps = {
  // 当前激活 tab 的 key
};

const tabs = [
  { key: 'home', title: '首页', icon: homeIcon, url: '/pages/index/index' },
  { key: 'notes', title: '笔记', icon: HistoryIcon, url: '/pages/notes/index' },
  { key: 'history', title: '历史', icon: NotesIcon, url: '/pages/history/index' },
];

const BottomTabBar: React.FC<BottomTabBarProps> = () => {

  const route = useRouter()
  const current = useMemo(() => {
    const tab =  tabs.find(t => route.path.startsWith(t.url))
    console.log("route", tab, route)
    return tab ? tab.key : 'home'
  }, [route.path])


  console.log(route)
  return (
    <View className="fixed bottom-0 left-0 right-0 flex border-t border-gray-200 bg-white">
      {tabs.map(tab => (
        <Navigator key={tab.key} url={tab.url} className="flex flex-1 flex-col items-center justify-center py-2" openType="switchTab">
          <Image src={tab.icon} className={`mb-1 h-6 w-6 ${current === tab.key ? 'opacity-100' : 'opacity-60'}`} />
          <Text className={`text-xs ${current === tab.key ? 'text-blue-500' : 'text-gray-500'}`}>{tab.title}</Text>
        </Navigator>
      ))}
    </View>
  );
};

export default BottomTabBar;
