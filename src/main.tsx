import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthProvider.tsx'
import AppDataProvider from './context/AppDataProvider.tsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppDataProvider>
          <App />
        </AppDataProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </AuthProvider>
)
