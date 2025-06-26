import React, { useEffect, useState } from 'react';
import { Button, Input, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import ApiService from '@/src/service';
import BottomTabBar from '@/src/components/BottomTabBar';

import { useAuthGuard } from '@/src/hooks';

const LENGTH_OPTIONS = [
  { label: '简短', value: 'short' },
  { label: '中等', value: 'medium' },
  { label: '较长', value: 'long' },
];

const STYLE_OPTIONS = [
  { label: '正式', value: 'formal' },
  { label: '幽默', value: 'humorous' },
  { label: '亲切', value: 'friendly' },
  { label: '小红书', value: '小红书' },
];

const HomePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [length, setLength] = useState('medium');
  const [style, setStyle] = useState('formal');
  const [result, setResult] = useState('');

  const handleInput = e => {
    setInputValue(e.detail.value);
  };

  useAuthGuard();

  const handleGenerate = () => {
    if (!inputValue.trim()) {
      Taro.showToast({ title: '请输入关键词', icon: 'none' });
      return;
    }
    ApiService.post<{
      statusCode: number,
      data: { result: string }
    }>('/ai/deepseek', {
      baseUrl: 'http://localhost:3000',
      data: {
        keywords: [inputValue],
        style,
        length,
      },
    }).then(res => {
      console.log(res)
      setResult(res.data.result);
    });
  };

  const handleCopy = () => {
    Taro.setClipboardData({
      data: result,
      success: () => Taro.showToast({ title: '已复制', icon: 'success' }),
    });
  };

  return (
    <View className="min-h-screen bg-gray-50 p-4">
      <View className="mb-6 text-center">
        <Text className="text-3xl font-bold text-blue-600">AI 文案助手</Text>
        <Text className="mt-1 block text-sm text-gray-500">让创作更简单高效</Text>
      </View>

      <View className="mb-4 rounded-xl bg-white p-4 shadow">
        <Input
          className="mb-3 w-full rounded border border-gray-300 p-3"
          type="text"
          placeholder="请输入关键词或提示语"
          value={inputValue}
          onInput={handleInput}
        />

        {/* 风格选择 */}
        <View className="mb-4">
          <Text className="mb-2 block font-semibold text-gray-700">选择风格</Text>
          <View className="flex flex-wrap gap-3">
            {STYLE_OPTIONS.map(({ label, value }) => (
              <View
                key={value}
                className={`cursor-pointer select-none rounded-full px-4 py-2
                  ${style === value ? 'bg-blue-500 text-white' : 'border border-gray-300 text-gray-700'}`}
                onClick={() => setStyle(value)}
              >
                {label}
              </View>
            ))}
          </View>
        </View>

        {/* 长度选择 */}
        <View className="mb-4">
          <Text className="mb-2 block font-semibold text-gray-700">选择文本长度</Text>
          <View className="flex flex-wrap gap-3">
            {LENGTH_OPTIONS.map(({ label, value }) => (
              <View
                key={value}
                className={`cursor-pointer select-none rounded-full px-4 py-2
                  ${length === value ? 'bg-blue-500 text-white' : 'border border-gray-300 text-gray-700'}`}
                onClick={() => setLength(value)}
              >
                {label}
              </View>
            ))}
          </View>
        </View>

        <Button className="w-full rounded-lg bg-blue-500 p-3 text-base text-white" onClick={handleGenerate}>
          立即生成文案
        </Button>
      </View>

      {result && (
        <View className="mb-4 rounded-xl bg-white p-4 shadow">
          <Text className="mb-2 block text-sm text-gray-600">生成结果：</Text>
          <Text className="mb-3 block text-base leading-relaxed">{result}</Text>
          <Button className="rounded border border-blue-500 p-2 text-sm text-blue-500" plain onClick={handleCopy}>
            复制文案
          </Button>
        </View>
      )}

      <Button className="mb-16 text-sm text-gray-500 underline" plain onClick={() => Taro.navigateTo({ url: '/pages/history/index' })}>
        查看历史记录
      </Button>

      <BottomTabBar />
    </View>
  );
};

export default HomePage;
