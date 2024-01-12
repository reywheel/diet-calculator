import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

export class ConfigStore {
  protein = 0;
  fats = 0;
  carbs = 0;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'configStore',
      properties: ['protein', 'fats', 'carbs'],
      storage: localStorage,
    });
  }

  setProtein = (v: number) => {
    this.protein = v;
  };

  setFats = (v: number) => {
    this.fats = v;
  };

  setCarbs = (v: number) => {
    this.carbs = v;
  };
}

export const configStore = new ConfigStore();
