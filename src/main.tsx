import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import App from "./App";

import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60_000, // 5분 캐시
      gcTime: 30 * 60_000, // 30분 qhrhks
      retry(failures, err: any) {
        const s = err?.response?.status;
        // 인증 계열은 재시도 금지(refresh 폭주 방지)
        if (s === 400 || s === 401 || s === 419) return false;
        return failures < 1; // 그 외엔 1번만
      },
    },
    mutations: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ReduxProvider>
  </StrictMode>,
)
