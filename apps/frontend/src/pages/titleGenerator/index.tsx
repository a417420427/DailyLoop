import React, { useState } from "react";
import { View, Textarea, Button, ScrollView, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import ApiService from "@/src/service";

export default function EmbedHotWords() {
  const [titlesText, setTitlesText] = useState("");
  const [keyPointsText, setKeyPointsText] = useState("");
  const [resultTitles, setResultTitles] = useState<string[]>([]);
  const [resultKeyPoints, setResultKeyPoints] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleEmbed = () => {
    const titles = titlesText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const keyPoints = keyPointsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (titles.length === 0) {
      Taro.showToast({ title: "请输入商品标题", icon: "none" });
      return;
    }
    if (keyPoints.length === 0) {
      Taro.showToast({ title: "请输入卖点", icon: "none" });
      return;
    }

    setLoading(true);

    ApiService.post<{ statusCode: number; data: { titles: string[]; keyPoints: string[] } }>(
      "/ai/embed-hot-words",
      {
        baseUrl: "http://localhost:3000",
        data: { titles, keyPoints },
      }
    )
      .then((res) => {
        if (res.statusCode === 200) {
          setResultTitles(res.data.titles);
          setResultKeyPoints(res.data.keyPoints);
        } else {
          Taro.showToast({ title: "嵌入失败，请重试", icon: "none" });
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
          className="border border-gray-300 rounded p-2 min-h-[80px]"
          placeholder="请输入商品标题，每行一个"
          value={titlesText}
          onInput={(e) => setTitlesText(e.detail.value)}
        />
      </View>
      <View className="mb-4">
        <Textarea
          className="border border-gray-300 rounded p-2 min-h-[80px]"
          placeholder="请输入卖点，每行一个"
          value={keyPointsText}
          onInput={(e) => setKeyPointsText(e.detail.value)}
        />
      </View>
      <Button
        className="bg-blue-500 text-white py-2 rounded mb-4"
        disabled={loading}
        onClick={handleEmbed}
      >
        {loading ? "嵌入中..." : "自动嵌入热词"}
      </Button>

      {(resultTitles.length > 0 || resultKeyPoints.length > 0) && (
        <View>
          {resultTitles.length > 0 && (
            <View className="mb-4">
              <Text className="font-bold mb-2 block">嵌入热词后的商品标题：</Text>
              {resultTitles.map((title, idx) => (
                <Text key={idx} className="block p-2 mb-1 bg-gray-100 rounded text-gray-700">
                  {idx + 1}. {title}
                </Text>
              ))}
            </View>
          )}
          {resultKeyPoints.length > 0 && (
            <View>
              <Text className="font-bold mb-2 block">嵌入热词后的卖点：</Text>
              {resultKeyPoints.map((point, idx) => (
                <Text key={idx} className="block p-2 mb-1 bg-gray-100 rounded text-gray-700">
                  {idx + 1}. {point}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
