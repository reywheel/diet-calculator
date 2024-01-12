import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { CloseIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';

import { filterProductsStore } from '../../model.ts';

interface Props {
  className?: string;
}

export const ProductsFilter = observer(({ className }: Props) => {
  const { queryString, onChangeQueryString, onClearQueryString, resetStore } =
    filterProductsStore;

  useEffect(() => {
    return () => resetStore();
  }, []);

  return (
    <InputGroup className={cn(className)}>
      <Input
        value={queryString}
        variant={'outline'}
        placeholder={'Название продукта'}
        onChange={(e) => onChangeQueryString(e.target.value)}
      />

      {queryString && (
        <InputRightElement>
          <IconButton
            size={'sm'}
            aria-label={'Очистить поисковую строку'}
            icon={<CloseIcon />}
            onClick={onClearQueryString}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
});
