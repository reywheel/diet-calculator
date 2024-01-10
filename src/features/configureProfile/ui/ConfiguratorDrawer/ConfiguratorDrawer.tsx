import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
  NumberInputField,
  Stack,
} from '@chakra-ui/react';
import {
  $protein,
  $carbs,
  $fats,
  setProtein,
  setFats,
  setCarbs,
} from '@/entities/config';
import { useStore } from '@nanostores/react';
import { Controller, useForm } from 'react-hook-form';

interface ConfiguratorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  protein: string;
  fats: string;
  carbs: string;
};

export const ConfiguratorDrawer = ({
  isOpen,
  onClose,
}: ConfiguratorDrawerProps) => {
  const protein = useStore($protein);
  const fats = useStore($fats);
  const carbs = useStore($carbs);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      protein,
      fats,
      carbs,
    },
  });

  const onSubmit = (data: FormData) => {
    setProtein(data.protein);
    setFats(data.fats);
    setCarbs(data.carbs);

    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={'md'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>Настройте свой аккаунт</DrawerHeader>

          <DrawerBody>
            <Stack spacing={3}>
              <FormControl isInvalid={!!errors.protein}>
                <FormLabel>Белки, гр.</FormLabel>

                <Controller
                  name={'protein'}
                  control={control}
                  rules={{
                    required: { value: true, message: 'Обязательное поле' },
                    min: { value: 1, message: 'Должно быть больше нуля' },
                  }}
                  render={({ field }) => (
                    <NumberInput {...field}>
                      <NumberInputField />
                    </NumberInput>
                  )}
                />

                <FormErrorMessage>{errors.protein?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.fats}>
                <FormLabel>Жиры, гр.</FormLabel>

                <Controller
                  name={'fats'}
                  control={control}
                  rules={{
                    required: { value: true, message: 'Обязательное поле' },
                    min: { value: 1, message: 'Должно быть больше нуля' },
                  }}
                  render={({ field }) => (
                    <NumberInput {...field}>
                      <NumberInputField />
                    </NumberInput>
                  )}
                />

                <FormErrorMessage>{errors.fats?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.carbs}>
                <FormLabel>Углеводы, гр.</FormLabel>

                <Controller
                  name={'carbs'}
                  control={control}
                  rules={{
                    required: { value: true, message: 'Обязательное поле' },
                    min: { value: 1, message: 'Должно быть больше нуля' },
                  }}
                  render={({ field }) => (
                    <NumberInput {...field}>
                      <NumberInputField />
                    </NumberInput>
                  )}
                />

                <FormErrorMessage>{errors.carbs?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme={'teal'}
              mr={'auto'}
              type={'submit'}
            >
              Сохранить
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};
