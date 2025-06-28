import { useState } from "react";
import { View, Button, Image, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import ApiService from "@/src/service";



const Index = () => {
  const [imagePath, setImagePath] = useState<string>("");
  const [result, setResult] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const chooseImage = () => {
    Taro.chooseImage({
      count: 1,
      success(res) {
        const path = res.tempFilePaths[0];
        setImagePath(path);
        setResult([]);
      },
    });
  };

  const uploadAndRecognize = async () => {
    if (!imagePath) return;

    setLoading(true);

    try {
      const data = await ApiService.uploadFile<{ result: { DetectedText: string }[] }>(
        "/image-analysis/ocr",
        imagePath,
        "image", // 你后端 multer 的字段名
        {
          extraConfig: {
            showLoading: true,
            isHasToken: false, // 根据后端是否需要 token 决定
          },
        }
      );

      const textList = data.result?.map(item => item.DetectedText) || [];
      setResult(textList);
    } catch (err) {
      console.error("上传失败", err);
      Taro.showToast({ title: "识别失败", icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="p-4 min-h-screen bg-gray-100">
      <Button className="bg-blue-500 text-white rounded-xl p-3 mb-4" onClick={chooseImage}>
        选择图片
      </Button>

      {imagePath && (
        <View className="mb-4">
          <Image src={imagePath} mode="widthFix" className="w-full rounded-xl shadow" />
        </View>
      )}

      {imagePath && (
        <Button className="bg-green-500 text-white rounded-xl p-3 mb-4" onClick={uploadAndRecognize} loading={loading}>
          开始识别
        </Button>
      )}

      {result.length > 0 && (
        <View className="bg-white p-4 rounded-xl shadow">
          <Text className="font-bold text-gray-700 mb-2 block">识别结果：</Text>
          {result.map((line, index) => (
            <Text key={index} className="block text-sm text-gray-800 mb-1">
              {line}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default Index;
