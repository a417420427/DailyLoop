import React, { useEffect, useState } from 'react';
import { View, Input, Button, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import BottomTabBar from '@/src/components/BottomTabBar';
import ApiService from '@/src/service';
import { authStore } from '@/src/stores/auth';

const HomePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (e) => {
    setInputValue(e.detail.value);
  };


  useEffect(() => {
     ApiService.get('/notes/user/' + authStore.getState().userId, {
      baseUrl: 'http://localhost:3000',
   
    })
  }, [])
  const handleGenerate = () => {
    if (!inputValue.trim()) {
      Taro.showToast({ title: '请输入关键词', icon: 'none' });
      return;
    }
    const mockResult = `基于「${inputValue}」生成的AI文案示例：让创作更高效！`;
    setResult(mockResult);
  };

  const handleCopy = () => {
    Taro.setClipboardData({
      data: result,
      success: () => Taro.showToast({ title: '已复制', icon: 'success' }),
    });
  };

  return (
    <View className="p-4 bg-gray-50 min-h-screen">
      <View className="text-center mb-6">
        <Text className="text-3xl font-bold text-blue-600">AI 文案助手</Text>
        <Text className="block text-sm text-gray-500 mt-1">让创作更简单高效</Text>
      </View>

      <View className="bg-white rounded-xl shadow p-4 mb-4">
        <Input
          className="border border-gray-300 rounded p-3 w-full mb-3"
          type="text"
          placeholder="请输入关键词或提示语"
          value={inputValue}
          onInput={handleInput}
        />

        <Button
          className="bg-blue-500 text-white rounded-lg p-3 w-full text-base"
          onClick={handleGenerate}
        >
          立即生成文案
        </Button>
      </View>

      {result && (
        <View className="bg-white rounded-xl shadow p-4 mb-4">
          <Text className="text-sm text-gray-600 block mb-2">生成结果：</Text>
          <Text className="text-base block mb-3 leading-relaxed">{result}</Text>
          <Button
            className="border border-blue-500 text-blue-500 rounded p-2 text-sm"
            plain
            onClick={handleCopy}
          >
            复制文案
          </Button>
        </View>
      )}

      <Button
        className="text-sm text-gray-500 underline mb-16"
        plain
        onClick={() => Taro.navigateTo({ url: '/pages/history/index' })}
      >
        查看历史记录
      </Button>

      <BottomTabBar />
    </View>
  );
};

export default HomePage;
