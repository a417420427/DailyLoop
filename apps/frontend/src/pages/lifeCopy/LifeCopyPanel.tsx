import { useState } from "react";
import { View, Textarea, Picker, Switch, Button, Text } from "@tarojs/components";

import ApiService from "@/src/service";

const sceneOptions = ["朋友圈", "日记", "小红书", "节日祝福", "随手记录"];
const toneOptions = ["治愈系", "搞笑", "励志", "文艺", "生活流", "种草口吻"];
const emotionOptions = ["快乐", "沮丧", "惊喜", "感恩", "疲惫", "平静"];

export default function LifeCopy() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [toneIndex, setToneIndex] = useState(0);
  const [emotionIndex, setEmotionIndex] = useState(0);
  const [keywords, setKeywords] = useState("");
  const [withImage, setWithImage] = useState(true);
  const [withTags, setWithTags] = useState(true);
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    const res = await ApiService.post<{ statusCode: number; data: { result: string } }>(
      "/ai/generate-life-copy",
      {
        baseUrl: "http://localhost:3000",
        data: {
          scene: sceneOptions[sceneIndex],
          keywords,
          tone: toneOptions[toneIndex],
          emotion: emotionOptions[emotionIndex],
          withImage,
          withTags,
        },
      }
    );

    if (res.statusCode === 200) {
      setResult(res.data.result);
    }
  };

  return (
    <View className="p-4 space-y-4">
      <Text className="text-xl font-bold">📌 生活文案生成</Text>

      <View>
        <Text>场景类型</Text>
        <Picker mode="selector" range={sceneOptions} onChange={e => setSceneIndex(Number(e.detail.value))}>
          <View className="p-2 border rounded bg-gray-100">{sceneOptions[sceneIndex]}</View>
        </Picker>
      </View>

      <View>
        <Text>关键词 / 想表达的内容</Text>
        <Textarea
          className="border rounded p-2 mt-1"
          placeholder="例：下班后散步，风很舒服"
          value={keywords}
          onInput={e => setKeywords(e.detail.value)}
        />
      </View>

      <View>
        <Text>风格选择</Text>
        <Picker mode="selector" range={toneOptions} onChange={e => setToneIndex(Number(e.detail.value))}>
          <View className="p-2 border rounded bg-gray-100">{toneOptions[toneIndex]}</View>
        </Picker>
      </View>

      <View>
        <Text>情绪状态（可选）</Text>
        <Picker mode="selector" range={emotionOptions} onChange={e => setEmotionIndex(Number(e.detail.value))}>
          <View className="p-2 border rounded bg-gray-100">{emotionOptions[emotionIndex]}</View>
        </Picker>
      </View>

      <View className="flex justify-between items-center">
        <Text>是否为配图文案</Text>
        <Switch checked={withImage} onChange={e => setWithImage(e.detail.value)} />
      </View>

      <View className="flex justify-between items-center">
        <Text>是否自动加标签</Text>
        <Switch checked={withTags} onChange={e => setWithTags(e.detail.value)} />
      </View>

      <Button className="bg-blue-500 text-white rounded p-2" onClick={handleGenerate}>
        ✨ 生成文案
      </Button>

      {result && (
        <View className="bg-gray-100 p-3 rounded space-y-2 mt-4">
          <Text className="font-bold">生成结果：</Text>
          {result.split("\n").map((line, i) => (
            <Text key={i} className="block">{line}</Text>
          ))}
        </View>
      )}
    </View>
  );
}
