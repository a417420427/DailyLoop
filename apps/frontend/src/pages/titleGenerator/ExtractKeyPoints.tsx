import React, { useState } from 'react';
import { Button, ScrollView, Text, Textarea, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import ApiService from '@/src/service';

export default function ExtractKeyPoints() {
  const [description, setDescription] = useState('');
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    if (!description.trim()) {
      Taro.showToast({ title: '请输入商品特性描述', icon: 'none' });
      return;
    }
    setLoading(true);

    try {
      ApiService.post<{ statusCode: number; data: { keyPoints: string } }>('/ai/extract-key-points', {
        baseUrl: 'http://localhost:3000',
        data: {
          description,
        },
      }).then(res => {
        if (res.statusCode === 200) {
          const points = res.data.keyPoints
            .split('\n')
            .map(line => line.trim())
            .filter(Boolean);
          setKeyPoints(points);
        }
      });
    } catch (error) {
      Taro.showToast({ title: '网络错误', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="min-h-screen bg-white p-4" scrollY>
      <View className="mb-4">
        <Textarea
          className="min-h-[100px] rounded border border-gray-300 p-2"
          placeholder="请输入商品特性描述（支持中英文）"
          value={description}
          onInput={e => setDescription(e.detail.value)}
        />
      </View>
      <Button className="mb-4 rounded bg-blue-500 py-2 text-white" disabled={loading} onClick={handleExtract}>
        {loading ? '提炼中...' : '提炼关键卖点'}
      </Button>
      {keyPoints.length > 0 && (
        <View>
          <Text className="mb-2 block font-bold">提炼出的关键卖点：</Text>
          {keyPoints.map((point, idx) => (
            <Text key={idx} className="mb-1 block rounded bg-gray-100 p-2 text-gray-700">
              {idx + 1}. {point}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
