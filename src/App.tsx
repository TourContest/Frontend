import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import GlobalStyles from './styles/global';
import TestPage from './pages/TestPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TestPage />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
