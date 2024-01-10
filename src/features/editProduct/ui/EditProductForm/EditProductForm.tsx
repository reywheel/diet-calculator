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
import { FormEventHandler } from 'react';
import { IProduct, IProductType, productStore } from '@/entities/product';
import styles from './EditProductForm.module.scss';
import {
  useActions as useEditProductActions,
  useEditableProduct,
} from '@/features/editProduct';

export const EditProductForm = () => {
  const editableProduct = useEditableProduct();
  const { setEditableProduct } = useEditProductActions();
  const { changeProduct } = productStore;

  const onChangeProduct = <T extends keyof IProduct>(
    field: T,
    value: IProduct[T],
  ) => {
    if (editableProduct)
      setEditableProduct({ ...editableProduct, [field]: value });
  };

  const onClickSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!editableProduct) throw new Error('Нет редактируемого продукта');

    changeProduct(editableProduct);
    setEditableProduct(null);
  };

  if (!editableProduct) return null;

  return (
    <form onSubmit={onClickSubmit}>
      <Stack spacing={6}>
        <Heading size={'lg'}>Изменение продукта</Heading>

        <FormControl>
          <FormLabel>Название</FormLabel>

          <Input
            value={editableProduct.name}
            variant={'outline'}
            onChange={(e) => onChangeProduct('name', e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Измерение продукта</FormLabel>

          <RadioGroup
            name="form-name"
            value={editableProduct.type}
            onChange={(v) => onChangeProduct('type', v as IProductType)}
          >
            <Stack
              spacing={5}
              direction="row"
            >
              <Radio value={'gram'}>Граммами</Radio>
              <Radio value={'piece'}>Штуками</Radio>
            </Stack>
          </RadioGroup>

          <FormErrorMessage>ты чё, а?</FormErrorMessage>
        </FormControl>

        <div className={styles.nutrients}>
          <FormControl>
            <FormLabel>Белки, гр.</FormLabel>

            <NumberInput
              value={editableProduct.protein}
              variant={'outline'}
              onChange={(v) => onChangeProduct('protein', +v)}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Жиры, гр.</FormLabel>

            <NumberInput
              value={editableProduct.fats}
              variant={'outline'}
              onChange={(v) => onChangeProduct('fats', +v)}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Углеводы, гр.</FormLabel>

            <NumberInput
              value={editableProduct.carbs}
              variant={'outline'}
              onChange={(v) => onChangeProduct('carbs', +v)}
            >
              <NumberInputField />
            </NumberInput>
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

          <Button onClick={() => setEditableProduct(null)}>Отменить</Button>
        </div>
      </Stack>
    </form>
  );
};
