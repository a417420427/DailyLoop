import { useState } from 'react';
import { Button, Input, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

const RegisterPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  const handleRegister = () => {
    if (!phone) {
      Taro.showToast({ title: '请输入手机号', icon: 'none' });
      return;
    }
    if (!password) {
      Taro.showToast({ title: '请输入密码', icon: 'none' });
      return;
    }
    if (!code) {
      Taro.showToast({ title: '请输入验证码', icon: 'none' });
      return;
    }

    // 模拟注册 API 调用
    Taro.showToast({ title: '注册成功', icon: 'success' });
    Taro.redirectTo({ url: '/pages/login/index' });
  };

  const sendCode = () => {
    if (!phone) {
      Taro.showToast({ title: '请输入手机号', icon: 'none' });
      return;
    }

    // 模拟验证码发送
    Taro.showToast({ title: '验证码已发送', icon: 'success' });

    // 启动倒计时
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <View className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <View className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <View className="mb-6 text-center text-2xl font-bold">注册</View>

        <Input
          className="mb-4 w-full rounded-lg border border-gray-300 p-3"
          type="text"
          placeholder="请输入手机号"
          value={phone}
          onInput={e => setPhone(e.detail.value)}
        />

   

        <Input
          className="mb-4 w-full rounded-lg border border-gray-300 p-3"
          type={'password' as any}
          placeholder="请输入密码"
          value={password}
          onInput={e => setPassword(e.detail.value)}
        />

        <View className="mb-4 flex items-center">
          <Input
            className="mr-2 flex-1 rounded-lg border border-gray-300 p-3"
            type="text"
            placeholder="验证码"
            value={code}
            onInput={e => setCode(e.detail.value)}
          />
          <Button
            className={`w-28 p-2 text-sm ${countdown > 0 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            disabled={countdown > 0}
            onClick={sendCode}
          >
            {countdown > 0 ? `${countdown}s` : '获取验证码'}
          </Button>
        </View>

        <Button className="rounded-lg bg-blue-500 p-3 text-white" onClick={handleRegister}>
          注册
        </Button>

        <Button
          className="mt-4 rounded-lg border border-blue-500 bg-transparent p-3 text-blue-500"
          onClick={() => Taro.redirectTo({ url: '/pages/login/index' })}
        >
          已有账号？去登录
        </Button>
      </View>
    </View>
  );
};

export default RegisterPage;
