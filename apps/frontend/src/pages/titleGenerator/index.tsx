import React, { useState } from "react";
import { View, Input, Textarea, Button, ScrollView, Text, Picker } from "@tarojs/components";
import Taro from "@tarojs/taro";
import ApiService from "@/src/service";

const platforms = ["淘宝", "拼多多", "京东"];
const tones = ["官方", "亲切", "潮流"];

export default function ProductCopyAssistant() {
  // 商品信息（全局绑定）
  const [productName, setProductName] = useState("");
  const [productPoints, setProductPoints] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [productFeatures, setProductFeatures] = useState("");

  // Tab 控制
  const [activeTab, setActiveTab] = useState<"titles" | "sellingPoints" | "detailCopy" | "embedHotWords">("titles");

  // 2.1 标题生成状态
  const [platformIndex, setPlatformIndex] = useState(0);
  const [toneIndex, setToneIndex] = useState(0);
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [loadingTitles, setLoadingTitles] = useState(false);

  // 2.2 卖点提炼状态
  const [extractedPoints, setExtractedPoints] = useState<string[]>([]);
  const [loadingPoints, setLoadingPoints] = useState(false);

  // 2.3 详情页文案状态
  const [detailCopy, setDetailCopy] = useState("");
  const [loadingDetailCopy, setLoadingDetailCopy] = useState(false);

  // 2.4 关键词嵌入状态
  const [embeddedTitles, setEmbeddedTitles] = useState<string[]>([]);
  const [embeddedPoints, setEmbeddedPoints] = useState<string[]>([]);
  const [loadingEmbed, setLoadingEmbed] = useState(false);

  // 2.1 生成标题
  const generateTitles = () => {
    if (!productName.trim() || !productPoints.trim()) {
      Taro.showToast({ title: "请填写商品名称和主要卖点", icon: "none" });
      return;
    }
    setLoadingTitles(true);
    ApiService.post<{ statusCode: number; data: { result: string[] } }>("/ai/generate-product-titles", {
      baseUrl: "http://localhost:3000",
      data: {
        productName,
        productPoints,
        targetAudience,
        platform: platforms[platformIndex],
        tone: tones[toneIndex],
      },
    })
      .then((res) => {
        if (res.statusCode === 200) {
          setGeneratedTitles(res.data.result);
        } else {
          Taro.showToast({ title: "标题生成失败", icon: "none" });
        }
      })
      .catch(() => {
        Taro.showToast({ title: "网络错误", icon: "none" });
      })
      .finally(() => setLoadingTitles(false));
  };

  // 2.2 卖点提炼
  const extractPoints = () => {
    if (!productFeatures.trim()) {
      Taro.showToast({ title: "请填写商品特性", icon: "none" });
      return;
    }
    setLoadingPoints(true);
    ApiService.post<{ statusCode: number; data: { keyPoints: string } }>("/ai/extract-key-points", {
      baseUrl: "http://localhost:3000",
      data: {
        description: productFeatures,
      },
    })
      .then((res) => {
        if (res.statusCode === 200) {
          setExtractedPoints(res.data.keyPoints
            .split('\n')
            .map(line => line.trim())
            .filter(Boolean));
        } else {
          Taro.showToast({ title: "卖点提炼失败", icon: "none" });
        }
      })
      .catch(() => Taro.showToast({ title: "网络错误", icon: "none" }))
      .finally(() => setLoadingPoints(false));
  };

  // 2.3 详情页文案生成
  const generateDetailCopy = () => {
    if (!productFeatures.trim()) {
      Taro.showToast({ title: "请填写商品特性", icon: "none" });
      return;
    }
    if (extractedPoints.length === 0) {
      Taro.showToast({ title: "请先提炼卖点", icon: "none" });
      return;
    }
    setLoadingDetailCopy(true);
    ApiService.post<{ statusCode: number; data: { detailCopy: string } }>("/ai/generate-detail-page-copy", {
      baseUrl: "http://localhost:3000",
      data: {
        productFeatures,
        keyPoints: extractedPoints.join('\n'),
      },
    })
      .then((res) => {
        if (res.statusCode === 200) {
          setDetailCopy(res.data.detailCopy);
        } else {
          Taro.showToast({ title: "详情文案生成失败", icon: "none" });
        }
      })
      .catch(() => Taro.showToast({ title: "网络错误", icon: "none" }))
      .finally(() => setLoadingDetailCopy(false));
  };

  // 2.4 关键词嵌入
  const embedHotWords = () => {
    if (generatedTitles.length === 0 && extractedPoints.length === 0) {
      Taro.showToast({ title: "请先生成标题和卖点", icon: "none" });
      return;
    }
    setLoadingEmbed(true);
    ApiService.post<{ statusCode: number; data: { titles: string[]; keyPoints: string[] } }>("/ai/embed-hot-words", {
      baseUrl: "http://localhost:3000",
      data: {
        titles: generatedTitles,
        keyPoints: extractedPoints,
      },
    })
      .then((res) => {
        if (res.statusCode === 200) {
          setEmbeddedTitles(res.data.titles);
          setEmbeddedPoints(res.data.keyPoints);
        } else {
          Taro.showToast({ title: "关键词嵌入失败", icon: "none" });
        }
      })
      .catch(() => Taro.showToast({ title: "网络错误", icon: "none" }))
      .finally(() => setLoadingEmbed(false));
  };

  return (
    <ScrollView className="p-4 bg-white min-h-screen" scrollY>
      {/* 商品基本信息输入 */}
      <View className="mb-4">
        <Input
          className="border border-gray-300 rounded p-2 mb-2"
          placeholder="商品名称"
          value={productName}
          onInput={(e) => setProductName(e.detail.value)}
        />
        <Textarea
          className="border border-gray-300 rounded p-2 mb-2"
          placeholder="主要卖点（多个用逗号分隔）"
          value={productPoints}
          onInput={(e) => setProductPoints(e.detail.value)}
        />
        <Input
          className="border border-gray-300 rounded p-2 mb-2"
          placeholder="目标人群（可选）"
          value={targetAudience}
          onInput={(e) => setTargetAudience(e.detail.value)}
        />
        <Textarea
          className="border border-gray-300 rounded p-2"
          placeholder="商品特性描述"
          value={productFeatures}
          onInput={(e) => setProductFeatures(e.detail.value)}
        />
      </View>

      {/* Tab 切换 */}
      <View className="flex mb-4 border-b border-gray-300">
        {[
          { key: "titles", label: "标题生成" },
          { key: "sellingPoints", label: "卖点提炼" },
          { key: "detailCopy", label: "详情页文案" },
          { key: "embedHotWords", label: "关键词嵌入" },
        ].map(({ key, label }) => (
          <View
            key={key}
            className={`flex-1 py-2 text-center cursor-pointer ${
              activeTab === key ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(key as any)}
          >
            {label}
          </View>
        ))}
      </View>

      {/* Tab 内容 */}
      <View>
        {activeTab === "titles" && (
          <View>
            <View className="mb-2 flex space-x-2">
              <Picker
                mode="selector"
                range={platforms}
                value={platformIndex}
                onChange={(e) => setPlatformIndex(Number(e.detail.value))}
              >
                <View className="flex-1 border border-gray-300 rounded p-2">{platforms[platformIndex]}</View>
              </Picker>
              <Picker
                mode="selector"
                range={tones}
                value={toneIndex}
                onChange={(e) => setToneIndex(Number(e.detail.value))}
              >
                <View className="flex-1 border border-gray-300 rounded p-2">{tones[toneIndex]}</View>
              </Picker>
            </View>
            <Button type="primary" loading={loadingTitles} onClick={generateTitles}>
              生成商品标题
            </Button>
            <View className="mt-4 space-y-2">
              {generatedTitles.map((title, i) => (
                <Text key={i} className="block p-2 border border-gray-200 rounded bg-gray-50">
                  {i + 1}. {title}
                </Text>
              ))}
            </View>
          </View>
        )}

        {activeTab === "sellingPoints" && (
          <View>
            <Button type="primary" loading={loadingPoints} onClick={extractPoints}>
              提炼关键卖点
            </Button>
            <View className="mt-4 space-y-2">
              {extractedPoints.map((point, i) => (
                <Text key={i} className="block p-2 border border-gray-200 rounded bg-gray-50">
                  {i + 1}. {point}
                </Text>
              ))}
            </View>
          </View>
        )}

        {activeTab === "detailCopy" && (
          <View>
            <Button type="primary" loading={loadingDetailCopy} onClick={generateDetailCopy}>
              生成详情页文案
            </Button>
            <Textarea
              className="mt-4 border border-gray-300 rounded p-2 min-h-[150px]"
              value={detailCopy}
              disabled
              placeholder="生成的详情页文案会显示在这里"
            />
          </View>
        )}

        {activeTab === "embedHotWords" && (
          <View>
            <Button type="primary" loading={loadingEmbed} onClick={embedHotWords}>
              在标题和卖点中嵌入热词
            </Button>

            <View className="mt-4">
              <Text className="font-semibold">标题（嵌入热词后）</Text>
              {embeddedTitles.map((title, i) => (
                <Text key={i} className="block p-2 border border-gray-200 rounded bg-gray-50 mt-1">
                  {i + 1}. {title}
                </Text>
              ))}
            </View>

            <View className="mt-4">
              <Text className="font-semibold">卖点（嵌入热词后）</Text>
              {embeddedPoints.map((point, i) => (
                <Text key={i} className="block p-2 border border-gray-200 rounded bg-gray-50 mt-1">
                  {i + 1}. {point}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
