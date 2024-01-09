import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { FormEventHandler, useState } from 'react';
import {
  IProduct,
  IProductType,
  useActions as useProductActions,
} from '@/entities/product';
import { nanoid } from 'nanoid';
import styles from './AddProductForm.module.scss';

export const AddProductForm = () => {
  const { addProduct } = useProductActions();

  const [name, setName] = useState('');
  const [type, setType] = useState<IProductType>('gram');
  const [protein, setProtein] = useState('');
  const [fats, setFats] = useState('');
  const [carbs, setCarbs] = useState('');

  const onClickSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newProduct: IProduct = {
      id: nanoid(),
      name,
      type,
      protein: 1,
      fats: 1,
      carbs: 2,
    };

    addProduct(newProduct);

    setName('');
  };

  return (
    <form onSubmit={onClickSubmit}>
      <Stack spacing={6}>
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

        <Button type={'submit'}>Добавить</Button>
      </Stack>
    </form>
  );
};
