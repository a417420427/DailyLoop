import React, { useState } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';

const ScanCodePage: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false);

  const handleScanCode = async () => {
    setError('');
    setScanResult(null);
    setScanning(true);

    try {
      const res = await Taro.scanCode({
        onlyFromCamera: false, // 设置为 true 则只允许通过相机扫码
        scanType: ['qrCode', 'barCode'], // 支持二维码和条形码
      });
      setScanResult(res.result || '未识别到内容');
    } catch (err: any) {
      setError(err.errMsg || '扫码失败');
    }

    setScanning(false);
  };

  return (
    <View className="flex min-h-screen flex-col items-center bg-gradient-to-b from-green-50 to-white p-6">
      <Button
        className="mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 text-white font-semibold shadow-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300"
        onClick={handleScanCode}
        disabled={scanning}
      >
        {scanning ? '识别中...' : '点击扫码识别'}
      </Button>

      {error && (
        <View className="mb-4 w-full max-w-md rounded bg-red-100 px-4 py-2 text-red-700 shadow-inner flex justify-between items-center">
          <Text>{error}</Text>
          <Button
            className="ml-4 rounded bg-red-300 px-3 py-1 text-white font-bold"
            onClick={() => setError('')}
          >
            关闭
          </Button>
        </View>
      )}

      {scanResult && (
        <View className="w-full max-w-xl rounded-lg border border-gray-300 bg-white p-4 shadow-md">
          <Text className="block text-lg font-semibold text-gray-800 mb-2">识别结果：</Text>
          <Text className="text-gray-600 break-words">{scanResult}</Text>
        </View>
      )}
    </View>
  );
};

export default ScanCodePage;
