import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import LifeCopy from "./LifeCopyPanel";
import TodoManager from "./TodoManager";

const tabNames = ["生活文案", "生活Todo+扩写"];
const components = [<LifeCopy />, <TodoManager />];

export default function MainPage() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <View className="min-h-screen bg-white">
      <View className="flex flex-row justify-around border-b">
        {tabNames.map((name, index) => (
          <View
            key={index}
            className={`py-3 px-4 text-center flex-1 ${
              index === currentTab
                ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setCurrentTab(index)}
          >
            {name}
          </View>
        ))}
      </View>

      <View className="p-4">{components[currentTab]}</View>
    </View>
  );
}
