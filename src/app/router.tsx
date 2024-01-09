import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/app/ui/Layout';
import { CalculatorPage } from '@/pages/calculatorPage';
import { ProductsPage } from '@/pages/productsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <CalculatorPage /> },
      { path: '/products', element: <ProductsPage /> },
    ],
  },
]);
