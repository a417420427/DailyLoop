import React, { useState } from 'react';
import { Button, Input, Picker, ScrollView, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import ApiService from '@/src/service';

const platforms = ['淘宝', '京东', '拼多多'];
const tones = ['官方', '亲切', '潮流'];

const TitleGenerator: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [productPoints, setProductPoints] = useState('');
  const [platformIndex, setPlatformIndex] = useState(0);
  const [toneIndex, setToneIndex] = useState(0);
  const [generatedTitle, setGeneratedTitle] = useState<string>('');

  const handleGenerate = () => {
    if (!productName) {
      Taro.showToast({ title: '请输入商品名称', icon: 'none' });
      return;
    }
    // 模拟生成文案

    ApiService.post<{ statusCode: number; data: { result: string } }>('/ai/generate-product-titles', {
      baseUrl: 'http://localhost:3000',
      data: {
        productName,
        productPoints,
        platform: platforms[platformIndex],
        tone: tones[toneIndex],
      },
    }).then(res => {
      if (res.statusCode === 200) {
        setGeneratedTitle(res.data.result);
      }
    });
  };

  return (
    <ScrollView className="p-4">
      <View className="mb-4">
        <Text className="mb-1 block text-sm text-gray-700">商品名称</Text>
        <Input
          className="w-full rounded border border-gray-300 p-2"
          placeholder="请输入商品名称"
          value={productName}
          onInput={e => setProductName(e.detail.value)}
        />
      </View>

      <View className="mb-4">
        <Text className="mb-1 block text-sm text-gray-700">主要卖点（选填）</Text>
        <Input
          className="w-full rounded border border-gray-300 p-2"
          placeholder="请输入主要卖点"
          value={productPoints}
          onInput={e => setProductPoints(e.detail.value)}
        />
      </View>

      <View className="mb-4">
        <Text className="mb-1 block text-sm text-gray-700">选择平台</Text>
        <Picker mode="selector" range={platforms} value={platformIndex} onChange={e => setPlatformIndex(Number(e.detail.value))}>
          <View className="rounded border border-gray-300 p-2">{platforms[platformIndex]}</View>
        </Picker>
      </View>

      <View className="mb-4">
        <Text className="mb-1 block text-sm text-gray-700">选择语气</Text>
        <Picker mode="selector" range={tones} value={toneIndex} onChange={e => setToneIndex(Number(e.detail.value))}>
          <View className="rounded border border-gray-300 p-2">{tones[toneIndex]}</View>
        </Picker>
      </View>

      <Button className="mb-4 rounded bg-blue-500 py-2 text-white" onClick={handleGenerate}>
        生成标题
      </Button>

      <View>
        <Text className="mb-2 block text-base font-semibold">生成结果</Text>

        <View className="mb-2 rounded border border-gray-200 bg-gray-50 p-2">{generatedTitle}</View>
      </View>
    </ScrollView>
  );
};

export default TitleGenerator;
