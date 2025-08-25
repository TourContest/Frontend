import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";
import GlobalStyles from "./styles/global";
import TestPage from "./pages/TestPage";
import SplashPage from "./pages/splash/SplashPage";
// import LanguageSelectorPage from './pages/splash/LanguageSettingPage';
import PermissionPage from "./pages/splash/PermissionPage";
import RegisterChoicePage from "./pages/splash/RegisterChoicePage";
import RegisterPage from "./pages/auth/register/normal";
import LoginPage from "./pages/auth/LoginPage";
import KaKaoRegisterPage from "./pages/auth/register/kakao";
import Main from "./pages/main/Main";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestPage />} />
          <Route path="/splash" element={<SplashPage />} />
          <Route path="/splash/permission" element={<PermissionPage />} />
          {/* <Route path='/splash/language' element={<LanguageSelectorPage/>}/> */}
          <Route
            path="/splash/register-choice"
            element={<RegisterChoicePage />}
          />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/reigser/kakao" element={<KaKaoRegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />

          {/* Main 진입 시 */}
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
