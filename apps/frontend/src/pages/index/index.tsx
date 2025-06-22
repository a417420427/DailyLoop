
import Container from '@/src/components/Container';
import SearchHeader from './SearchHeader';
import { View } from '@tarojs/components';
import CardList from './CardList';

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
      <View className="fixed top-0 left-0 right-0 w-full box-border flex items-center p-2 bg-white shadow z-50">
        <SearchHeader />
        <CardList data={sampleData} />
      </View>
    
    </Container>
  );
};

export default Index;
