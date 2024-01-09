import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router.tsx';
import { ChakraProvider } from '@chakra-ui/react';

export const App = () => {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};
