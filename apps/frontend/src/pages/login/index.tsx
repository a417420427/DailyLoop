import { useState } from 'react';
import { Button, Input, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import ApiService, { CustomResult } from '@/src/service';
import { authStore } from '@/src/stores/auth';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!phone) {
      Taro.showToast({ title: '请输入手机号', icon: 'none' });
      return;
    }
    if (!password) {
      Taro.showToast({ title: '请输入密码', icon: 'none' });
      return;
    }

    ApiService.post<{
      statusCode: number
      data: { token: string; userId: string; username: string }
    }>('/auth/login-by-password', {
    
      data: {
        username: phone,
        password: password,
        phone,
      },
    })
      .then(res => {
        if (res.statusCode === 200) {
          Taro.showToast({ title: '登录成功', icon: 'success' });
          Taro.redirectTo({
            url: '/pages/index/index',
          });
        }
        authStore.setState(state => {
          state.token = res.data.token ?? '';
          state.userId = res.data.userId ?? '';
          state.username = res.data.username ?? '';
          return state
        });
       
      })
      .catch(err => {
        console.log(err, '登录错误');
      });

    return;
    // 模拟登录逻辑
    Taro.showToast({ title: '登录成功', icon: 'success' });
    // 你可以在这里调用接口
  };

  const goToRegister = () => {
    Taro.navigateTo({
      url: '/pages/register/index',
    });
  };

  return (
    <View className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <View className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <View className="mb-6 text-center text-2xl font-bold">登录</View>

        <Input
          className="mb-4 w-full rounded-lg border border-gray-300 p-3"
          type="text"
          placeholder="请输入手机号"
          value={phone}
          onInput={e => setPhone(e.detail.value)}
        />

        <Input
          className="mb-4 w-full rounded-lg border border-gray-300 p-3"
          type={'password' as any} // 防止 TS 报错
          placeholder="请输入密码"
          value={password}
          onInput={e => setPassword(e.detail.value)}
        />

        <Button className="mb-4 rounded-lg bg-blue-500 p-3 text-white" onClick={handleLogin}>
          登录
        </Button>

        <Button className="rounded-lg border border-blue-500 bg-transparent p-3 text-blue-500" onClick={goToRegister}>
          注册
        </Button>
      </View>
    </View>
  );
};

export default LoginPage;
