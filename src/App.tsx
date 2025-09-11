import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, RegisterProvider } from "./context";
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
import MyPage from "./pages/mypage/MyPage";
import ShopPage from "./pages/inapp/ShopPage";
import MyCouponsPage from "./pages/mypage/mycoupon/MyCouponsPage";
import MyCouponDetailPage from "./pages/mypage/mycoupon/MyCouponDetailPage";
import ProductShopPage from "./pages/inapp/ProductDetailPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TestPage />} />
            {/* 스플래시 */}
            <Route path="/splash" element={<SplashPage />} />
            <Route path="/splash/permission" element={<PermissionPage />} />
            {/* <Route path='/splash/language' element={<LanguageSelectorPage/>}/> */}
            <Route
              path="/splash/register-choice"
              element={
                <RegisterProvider>
                  <RegisterChoicePage />
                </RegisterProvider>
              }
            />

            {/* auth - register, login */}
            <Route path="/auth/register" element={
              <RegisterProvider>
                <RegisterPage />
              </RegisterProvider>
            } />
            <Route path="/auth/register/kakao" element={
                <RegisterProvider>
                  <KaKaoRegisterPage />
                </RegisterProvider>
              } />
            <Route path="/auth/login" element={<LoginPage />} />

            {/* Main 진입 시 */}
            <Route path="/main" element={<Main />} />

            {/* my page*/}
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/mycoupons" element={<MyCouponsPage />} />
            <Route path="/mypage/mycoupons/:exchangeId" element={<MyCouponDetailPage />} />

            {/* in-app */}
            <Route path="/inapp/shop" element={<ShopPage />}/>
            <Route path="/inapp/shop/:productId" element={<ProductShopPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </ThemeProvider>
  );
}

export default App;
