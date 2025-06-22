import ApiService from "@/src/service";
import { View, Input, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!phone) {
      Taro.showToast({ title: "请输入手机号", icon: "none" });
      return;
    }
    if (!password) {
      Taro.showToast({ title: "请输入密码", icon: "none" });
      return;
    }

      ApiService.post('/auth/login-by-password', {
      baseUrl: 'http://localhost:3000',
      data: {
        username: phone,
        password: password,
        phone,
      },
    }).then(res => {
      console.log(res)
    })

    return
    // 模拟登录逻辑
    Taro.showToast({ title: "登录成功", icon: "success" });
    // 你可以在这里调用接口
  };

  const goToRegister = () => {
    Taro.navigateTo({
      url: "/pages/register/index",
    });
  };

  return (
    <View className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <View className="bg-white p-6 rounded-2xl shadow w-full max-w-md">
        <View className="text-2xl font-bold mb-6 text-center">登录</View>

        <Input
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          type="text"
          placeholder="请输入手机号"
          value={phone}
          onInput={(e) => setPhone(e.detail.value)}
        />

        <Input
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          type={"password" as any} // 防止 TS 报错
          placeholder="请输入密码"
          value={password}
          onInput={(e) => setPassword(e.detail.value)}
        />

        <Button
          className="bg-blue-500 text-white rounded-lg p-3 mb-4"
          onClick={handleLogin}
        >
          登录
        </Button>

        <Button
          className="bg-transparent text-blue-500 border border-blue-500 rounded-lg p-3"
          onClick={goToRegister}
        >
          注册
        </Button>
      </View>
    </View>
  );
};

export default LoginPage;
