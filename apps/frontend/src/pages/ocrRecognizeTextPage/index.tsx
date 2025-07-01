import React, { useState } from 'react';
import { Button, Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import ApiService from '@/src/service';

interface RecognizeResult {
  result: {
    content: string; // 识别出的二维码或条形码内容
  };
  imageUrl: string;
}

interface PositionPoint {
  X: number;
  Y: number;
}

interface Position {
  LeftBottom: PositionPoint;
  LeftTop: PositionPoint;
  RightBottom: PositionPoint;
  RightTop: PositionPoint;
}

interface CodeResult {
  Position: Position;
  TypeName: string; // 如: "QR_CODE"
  Url: string; // 如: "https://secretclubscn.com/leafcode"
}

interface ImgSize {
  High: number;
  Wide: number;
}

interface QRCodeResponse {
  result: {
    CodeResults: CodeResult[];
    ImgSize: ImgSize;
    RequestId: string;
  };
  imageUrl: string;
}

const ScanImageOrCodePage: React.FC = () => {
  const [imagePath, setImagePath] = useState('');
  const [resultText, setResultText] = useState<QRCodeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // 选择/拍照 上传图片进行识别
  const chooseOrTakePhoto = async () => {
    try {
      setError('');
      setLoading(true);

      const res = await Taro.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'], // 支持拍照或相册
      });

      const filePath = res.tempFiles[0].tempFilePath;

      const resData = await ApiService.uploadFile<QRCodeResponse>('/ocr/scan-code', filePath);
      setResultText(resData);
      if (resData.imageUrl) {
        setImagePath(resData.imageUrl);
      }
    } catch (e: any) {
      setError(e.message || '识别失败');
      setResultText(null);
      setImagePath('');
    } finally {
      setLoading(false);
    }
  };


  return (
    <View className="flex min-h-screen flex-col items-center space-y-5 bg-gradient-to-b from-yellow-50 to-white p-6">
      <Button
        className="rounded bg-blue-500 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-600"
        onClick={chooseOrTakePhoto}
        disabled={loading}
      >
        拍照或上传图片识别
      </Button>

      {loading && <Text className="text-blue-600">识别中，请稍候...</Text>}

      {error && (
        <View className="w-full max-w-md rounded bg-red-100 p-3 text-red-700 shadow">
          <Text>{error}</Text>
        </View>
      )}

      {imagePath && <Image src={imagePath} mode="widthFix" className="mt-4 max-w-xs rounded-lg border border-gray-300 shadow" />}

      {resultText?.result.CodeResults[0].Url && (
        <View className="mt-4 w-full max-w-xl rounded border border-gray-200 bg-white p-4 shadow">
          <Text className="mb-2 text-lg font-bold text-gray-700">识别结果：</Text>
          <Text className="break-words text-gray-600">{resultText?.result.CodeResults[0].Url}</Text>
        </View>
      )}
    </View>
  );
};

export default ScanImageOrCodePage;
