import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

import { IProductType } from '@/entities/product';
import { editProductStore } from '@/features/editProduct';

import styles from './EditProductForm.module.scss';

type FormData = {
  name: string;
  type: IProductType;
  protein: string;
  fats: string;
  carbs: string;
};

export const EditProductForm = () => {
  const { editableProduct, onSaveProduct, onCancel } = editProductStore;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      name: editableProduct?.name || '',
      type: editableProduct?.type || 'gram',
      protein: editableProduct?.protein.toString() || '',
      fats: editableProduct?.fats.toString() || '',
      carbs: editableProduct?.carbs.toString() || '',
    },
  });

  const onClickSubmit = (data: FormData) => {
    if (editableProduct)
      onSaveProduct({
        ...editableProduct,
        ...data,
        protein: +data.protein,
        fats: +data.fats,
        carbs: +data.carbs,
      });
  };

  if (!editableProduct) return null;

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      <Stack spacing={6}>
        <Heading size={'lg'}>Изменение продукта</Heading>

        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Название</FormLabel>

          <Controller
            name={'name'}
            control={control}
            rules={{ required: { value: true, message: 'Обязательное поле' } }}
            render={({ field }) => (
              <Input
                {...field}
                variant={'outline'}
              />
            )}
          />

          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.type}>
          <FormLabel>Измерение продукта</FormLabel>

          <Controller
            name={'type'}
            control={control}
            rules={{ required: { value: true, message: 'Обязательное поле' } }}
            render={({ field }) => (
              <RadioGroup {...field}>
                <Stack
                  spacing={5}
                  direction="row"
                >
                  <Radio value={'gram'}>Граммами</Radio>
                  <Radio value={'piece'}>Штуками</Radio>
                </Stack>
              </RadioGroup>
            )}
          />

          <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
        </FormControl>

        <div className={styles.nutrients}>
          <FormControl isInvalid={!!errors.protein}>
            <FormLabel>Белки, гр.</FormLabel>

            <Controller
              name={'protein'}
              control={control}
              rules={{
                required: { value: true, message: 'Обязательное поле' },
                min: {
                  value: 0,
                  message: 'Должно быть больше либо равно нулю',
                },
              }}
              render={({ field }) => (
                <NumberInput
                  variant={'outline'}
                  {...field}
                >
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
                min: {
                  value: 0,
                  message: 'Должно быть больше либо равно нулю',
                },
              }}
              render={({ field }) => (
                <NumberInput
                  variant={'outline'}
                  {...field}
                >
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
                min: {
                  value: 0,
                  message: 'Должно быть больше либо равно нулю',
                },
              }}
              render={({ field }) => (
                <NumberInput
                  variant={'outline'}
                  {...field}
                >
                  <NumberInputField />
                </NumberInput>
              )}
            />

            <FormErrorMessage>{errors.carbs?.message}</FormErrorMessage>
          </FormControl>
        </div>

        <div>
          <Button
            className={styles.saveButton}
            type={'submit'}
            colorScheme={'teal'}
          >
            Сохранить
          </Button>

          <Button onClick={onCancel}>Отменить</Button>
        </div>
      </Stack>
    </form>
  );
};
