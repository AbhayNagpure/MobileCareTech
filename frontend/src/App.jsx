import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Store from './pages/Store';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import AdminRoute from './components/AdminRoute';
import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider } from './components/LanguageProvider';
import { AuthProvider } from './context/AuthContext';
import { config } from './config';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/store',
        element: <Store />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/admin',
        element: <AdminRoute><Admin /></AdminRoute>,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="touchcare-theme-dark">
      <LanguageProvider>
        <GoogleOAuthProvider clientId={config.googleClientId}>
          <AuthProvider>
            <Toaster position="top-right" />
            <RouterProvider router={router} />
          </AuthProvider>
        </GoogleOAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
