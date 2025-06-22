import { View } from '@tarojs/components';

import Container from '@/src/components/Container';

definePageConfig({
  navigationBarTitleText: '首页',
});

const Index = () => {



  return (
    <Container className="index py-5 flex-col-center">
      <View>Login</View>
    </Container>
  );
};

export default Index;
