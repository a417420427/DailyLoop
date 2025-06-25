import { View } from '@tarojs/components';
import Container from '@/src/components/Container';

import CardList from './CardList';
import SearchHeader from './SearchHeader';
import BottomTabBar from '@/src/components/BottomTabBar';

definePageConfig({
  navigationBarTitleText: '首页',
});

const Index = () => {
  const sampleData = [
    {
      id: 1,
      name: '张三',
      time: '2025-06-22 10:30',
      title: '这是一个示例标题，用来展示卡片列表的样式效果。支持多行换行显示。',
    },
    {
      id: 2,
      name: '李四',
      time: '2025-06-21 14:00',
      title: '第二条卡片的标题，内容简洁明了。',
    },
  ];



  // 在页面或组件里

  return (
    <Container className="index py-5 flex-col-center">
      <View className="fixed left-0 right-0 top-0 z-50 box-border flex w-full items-center bg-white shadow">
        <SearchHeader />
        <View className="pt-12">
          <CardList data={sampleData} />
        </View>

        <BottomTabBar  />
      </View>
    </Container>
  );
};

export default Index;
