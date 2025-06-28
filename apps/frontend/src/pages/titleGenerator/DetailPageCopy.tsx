import { useState } from "react";
import { View, Textarea, Button, ScrollView, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import ApiService from "@/src/service";


export default function DetailPageCopy() {
  const [productFeatures, setProductFeatures] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [detailCopy, setDetailCopy] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!productFeatures.trim()) {
      Taro.showToast({ title: "请输入商品特性", icon: "none" });
      return;
    }
    if (!keyPoints.trim()) {
      Taro.showToast({ title: "请输入卖点", icon: "none" });
      return;
    }

    setLoading(true);
    ApiService.post<{ statusCode: number; data: { detailCopy: string } }>("/ai/generate-detail-page-copy", {
      baseUrl: "http://localhost:3000",
      data: { productFeatures, keyPoints },
    })
      .then((res) => {
        if (res.statusCode === 200) {
          setDetailCopy(res.data.detailCopy);
        } else {
          Taro.showToast({ title: "生成失败，请重试", icon: "none" });
        }
      })
      .catch(() => {
        Taro.showToast({ title: "网络错误", icon: "none" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ScrollView className="p-4 bg-white min-h-screen" scrollY>
      <View className="mb-4">
        <Textarea
          className="border border-gray-300 rounded p-2 min-h-[100px]"
          placeholder="请输入商品特性（必填）"
          value={productFeatures}
          onInput={(e) => setProductFeatures(e.detail.value)}
        />
      </View>
      <View className="mb-4">
        <Textarea
          className="border border-gray-300 rounded p-2 min-h-[100px]"
          placeholder="请输入卖点（必填）"
          value={keyPoints}
          onInput={(e) => setKeyPoints(e.detail.value)}
        />
      </View>
      <Button
        className="bg-blue-500 text-white py-2 rounded mb-4"
        disabled={loading}
        onClick={handleGenerate}
      >
        {loading ? "生成中..." : "生成详情页文案"}
      </Button>
      {detailCopy && (
        <View className="bg-gray-100 p-4 rounded text-gray-800 whitespace-pre-wrap">
          <Text className="font-bold mb-2 block">生成的详情页文案：</Text>
          <Text>{detailCopy}</Text>
        </View>
      )}
    </ScrollView>
  );
}
