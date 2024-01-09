import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  NumberInput,
  NumberInputField,
  Stack,
} from '@chakra-ui/react';
import {
  useActions,
  useCarbs,
  useFats,
  useProtein,
} from '@/features/configureProfile';

interface ConfiguratorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfiguratorDrawer = ({
  isOpen,
  onClose,
}: ConfiguratorDrawerProps) => {
  const protein = useProtein();
  const fats = useFats();
  const carbs = useCarbs();
  const { setProtein, setFats, setCarbs } = useActions();

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={'md'}
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Настройте свой аккаунт</DrawerHeader>

        <DrawerBody>
          <Stack spacing={3}>
            <div>
              <FormLabel>Белки, гр.</FormLabel>

              <NumberInput
                value={protein}
                onChange={setProtein}
              >
                <NumberInputField />
              </NumberInput>
            </div>

            <div>
              <FormLabel>Жиры, гр.</FormLabel>

              <NumberInput
                value={fats}
                onChange={setFats}
              >
                <NumberInputField />
              </NumberInput>
            </div>

            <div>
              <FormLabel>Углеводы, гр.</FormLabel>

              <NumberInput
                value={carbs}
                onChange={setCarbs}
              >
                <NumberInputField />
              </NumberInput>
            </div>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
