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
import { FormEventHandler, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { IProduct, IProductType, productStore } from '@/entities/product';

import styles from './AddProductForm.module.scss';

export const AddProductForm = observer(() => {
  const [name, setName] = useState('');
  const [type, setType] = useState<IProductType>('gram');
  const [protein, setProtein] = useState('');
  const [fats, setFats] = useState('');
  const [carbs, setCarbs] = useState('');

  const resetFormState = () => {
    setName('');
    setType('gram');
    setProtein('');
    setFats('');
    setCarbs('');
  };

  const onClickSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newProduct: Omit<IProduct, 'id'> = {
      name,
      type,
      protein: +protein,
      fats: +fats,
      carbs: +carbs,
    };

    productStore.addProduct(newProduct);

    resetFormState();
  };

  return (
    <form onSubmit={onClickSubmit}>
      <Stack spacing={6}>
        <Heading size={'lg'}>Добавление продукта</Heading>

        <FormControl>
          <FormLabel>Название</FormLabel>

          <Input
            value={name}
            variant={'outline'}
            onChange={(v) => setName(v.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Измерение продукта</FormLabel>

          <RadioGroup
            name="form-name"
            value={type}
            onChange={(v) => setType(v as IProductType)}
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
              value={protein}
              variant={'outline'}
              onChange={setProtein}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Жиры, гр.</FormLabel>

            <NumberInput
              value={fats}
              variant={'outline'}
              onChange={setFats}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Углеводы, гр.</FormLabel>

            <NumberInput
              value={carbs}
              variant={'outline'}
              onChange={setCarbs}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
        </div>

        <Button
          type={'submit'}
          colorScheme={'teal'}
        >
          Добавить
        </Button>
      </Stack>
    </form>
  );
});
