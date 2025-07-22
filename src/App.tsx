import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Provider } from 'react-redux';
import { theme } from "./styles/theme";
import GlobalStyles from "./styles/global";
import { store } from './store';
import { CommunityProvider } from './contexts/CommunityContext';
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import CommunityPage from "./pages/CommunityPage";
import MyPage from "./pages/MyPage";
import PostDetailPage from "./pages/PostDetailPage";
import WritePage from "./pages/WritePage";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <CommunityProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
              <Route path="/write" element={<WritePage />} />
            </Routes>
          </BrowserRouter>
        </CommunityProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
