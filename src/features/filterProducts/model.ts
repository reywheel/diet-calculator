import { makeAutoObservable } from 'mobx';

export class FilterProductsStore {
  queryString = '';

  constructor() {
    makeAutoObservable(this);
  }

  onChangeQueryString = (value: string) => {
    this.queryString = value.trim();
  };

  onClearQueryString = () => {
    this.queryString = '';
  };

  resetStore = () => {
    this.queryString = '';
  };
}

export const filterProductsStore = new FilterProductsStore();
