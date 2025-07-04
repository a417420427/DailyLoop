import { PropsWithChildren, useEffect, useState } from 'react';
import Taro, { useDidHide, useDidShow } from '@tarojs/taro';
import { focusManager, onlineManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';


import './app.less';

if (process.env.TARO_ENV === 'weapp') {
  import('abortcontroller-polyfill/dist/abortcontroller-polyfill-only');
}

function App({ children }: PropsWithChildren<{}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
          },
        },
      })
  );
  useEffect(() => {
    //从无网络状态变为有网络时react-query自动重新发起请求
    function onlineChange(res) {
      if (onlineManager.isOnline() === res.isConnected) return;
      onlineManager.setOnline(res.isConnected);
    }
    Taro.onNetworkStatusChange(onlineChange);
    return () => {
      Taro.offNetworkStatusChange(onlineChange);
    };
  }, []);

  useDidShow(() => {
    focusManager.setFocused(true);
  });
  useDidHide(() => {
    focusManager.setFocused(false);
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default App;
