export type IProductType = 'piece' | 'gram';

export type IProduct = {
  id: string;
  name: string;
  type: IProductType;
  protein: number;
  fats: number;
  carbs: number;
};
