import { StrictMode } from 'react';
import theme from './styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CategoryPage, SearchPage, PeoplePage } from './pages';
import { Layout } from './components';

const queryClient = new QueryClient();

function App() {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="search/*" element={<SearchPage />} />
                <Route path="/category/people" element={<PeoplePage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/" element={<Navigate to="/search" />} />
                <Route path="*" element={<Navigate to="/search" />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
