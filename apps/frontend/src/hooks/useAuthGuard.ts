// hooks/useAuthGuard.ts
import { useEffect } from 'react';
import Taro from '@tarojs/taro';

import { useAuthStore } from '../stores/auth';

export function useAuthGuard() {
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      Taro.redirectTo({
        url: '/pages/login/index', // 改成你的首页路径
      });
    }
  }, [token]);
}
