import ApiService from "@/src/service";
import { View, Input, Button, Text } from "@tarojs/components";
import { useState } from "react";
export default function TodoManager() {
  const [task, setTask] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleAiExpand = async () => {
    const res = await ApiService.post<{ statusCode: number; data: { result: string } }>(
      "/ai/generate-life-copy",
      {
        baseUrl: "http://localhost:3000",
        data: {
          scene: "日记",
          keywords: task,
          tone: "文艺",
          emotion: "平静",
          withImage: false,
          withTags: false,
        },
      }
    );

    if (res.statusCode === 200) {
      setSuggestion(res.data.result);
    }
  };

  return (
    <View className="space-y-4">
      <Text className="text-xl font-bold">📅 Todo + 文案扩写</Text>

      <Input
        className="border rounded px-2 py-1"
        placeholder="输入今日任务或想做的事"
        value={task}
        onInput={(e) => setTask(e.detail.value)}
      />

      <Button onClick={handleAiExpand} className="bg-blue-500 text-white p-2 rounded">
        ✨ 智能扩写成文案
      </Button>

      {suggestion && (
        <View className="bg-gray-100 p-3 rounded space-y-2">
          <Text className="font-bold">AI写的文案：</Text>
          {suggestion.split("\n").map((line, i) => (
            <Text key={i} className="block">{line}</Text>
          ))}
        </View>
      )}
    </View>
  );
}
