import React from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

export interface OcrDetection {
  DetectedText: string;
  Confidence: number;
  ItemPolygon: {
    X: number;
    Y: number;
    Width: number;
    Height: number;
  };
}

interface Props {
  detections: OcrDetection[];
  originalImageWidth: number; // 原图宽度，如 OCR 所处理图片是 1080px
}

const OcrBoxes: React.FC<Props> = ({ detections, originalImageWidth }) => {
  const screenWidth = Taro.getSystemInfoSync().screenWidth;
  const scale = screenWidth / originalImageWidth;

  return (
    <View className="relative h-[1000px] w-full overflow-hidden">
      <View
        style={{
          width: `${originalImageWidth}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
        className="relative h-[1000px] w-full"
      >
        {/* 设定大容器高度或可调 */}
        {detections.map((item, idx) => {
          const { X, Y, Width, Height } = item.ItemPolygon;
          return (
            <View
              key={idx}
              className="border-black-500 absolute rounded   border p-1 text-xs text-black"
              style={{
                left: `${X}px`,
                top: `${Y}px`,
                width: `${Width}px`,
                height: `${Height}px`,
              }}
            >
              {item.DetectedText}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default OcrBoxes;
