import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import HomePage from '@/components/pages/HomePage';
import NotFoundPage from '@/components/pages/NotFoundPage';
import { routeArray } from './config/routes';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface-900 text-white">
        <Routes>
          <Route path="/" element={<Layout />}>
<Route index element={<HomePage />} />
            {routeArray.map(route => (
              <Route 
                key={route.id} 
                path={route.path} 
                element={<route.component />} 
              />
            ))}
<Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className="z-[9999]"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;