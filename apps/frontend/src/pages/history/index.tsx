import React, { useState } from "react";
import { View, Text, Button, ScrollView } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import ApiService from "@/src/service";
import BottomTabBar from '@/src/components/BottomTabBar';

interface HistoryRecord {
  id: string;
  keywords: string[];
  style: string;
  length: "short" | "medium" | "long";
  prompt: string;
  result: string;
  created_at: string;
}


const HistoryPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(
    null
  );

  const [data, setData] = useState<HistoryRecord[]>([]);

  useLoad(() => {
    // 这里可以加载数据
     ApiService.get<{statusCode: number, data: HistoryRecord[]}>('/copy-history', {
       baseUrl: 'http://localhost:3000',
     }).then(res => {
       console.log(res, 'rrres')
       if (res.statusCode === 200) {
         setData(res.data);
       }
     }).catch(err => {
       console.log(err, 'rrr')
     })
  });
  

  const openModal = (record: HistoryRecord) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  return (
    <View className="min-h-screen bg-gray-100 p-4">

      <View className="space-y-4">
        {data.map((item) => (
          <View
            key={item.id}
            className="bg-white rounded-2xl shadow p-4 space-y-2"
          >
            <Text className="text-lg font-semibold text-gray-800">
              关键词：{item.keywords.join(", ")}
            </Text>
            <Text className="text-sm text-gray-500">
              风格：{item.style} ｜ 长度：{item.length}
            </Text>
            <Text className="text-xs text-gray-400">
              创建时间：{new Date(item.created_at).toLocaleString()}
            </Text>
            <Text
              className="text-sm text-gray-700"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.result.replace(/\n/g, " ")}
            </Text>
            <Button
              className="text-blue-600 text-sm p-0 mt-1"
              onClick={() => openModal(item)}
            >
              查看详情
            </Button>
          </View>
        ))}
      </View>

      {showModal && selectedRecord && (
        <View className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <View className="bg-white rounded-xl p-4 max-w-md w-11/12 max-h-[70vh] overflow-auto">
            <Text className="text-lg font-bold mb-2">详情</Text>
            <ScrollView scrollY style={{ maxHeight: "60vh" }}>
              <Text className="text-sm whitespace-pre-wrap text-gray-700">
                {selectedRecord.result}
              </Text>
            </ScrollView>
            <Button
              className="mt-3 text-blue-600 text-sm p-0"
              onClick={closeModal}
            >
              关闭
            </Button>
          </View>
        </View>
      )}


      <BottomTabBar />
    </View>
  );
};

export default HistoryPage;
