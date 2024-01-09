import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/app/ui/Layout';
import { MainPage } from '@/pages/mainPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '/', element: <MainPage /> }],
  },
]);
