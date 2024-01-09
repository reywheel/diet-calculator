import { Button, useDisclosure } from '@chakra-ui/react';
import { ConfiguratorDrawer } from '../../ui/ConfiguratorDrawer';

export const OpenProfileConfiguratorButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Настройки</Button>

      <ConfiguratorDrawer
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
