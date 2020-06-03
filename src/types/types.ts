import * as actionTypes from "../store/actions/actionTypes";

export interface Item {
  name: string;
  quantity: number;
  cost: number;
  src: string;
}

export interface Billionaire {
  name: string;
  totalMoney: number;
  introduction: string;
  imageSrc: string;
  wealthSource: string;
}

export interface ReducerModel {
  totalMoney: number;
  items: Item[];
  billionaires: Billionaire[];
  currentBillionaire: Billionaire;
}

export interface InitBillionaires {
  type: typeof actionTypes.INIT_BILLIONAIRES;
}

export interface UpdateBillionaire {
  type: typeof actionTypes.UPDATE_BILLIONAIRE;
  billionaire: Billionaire;
}

export interface SetBillionaires {
  type: typeof actionTypes.SET_BILLIONAIRES;
  billionaires: Billionaire[];
}

export interface UpdateItem {
  type: typeof actionTypes.UPDATE_ITEM;
  payload: {
    item: Item;
    quantity: number;
  };
}

export type ActionsModel =
  | InitBillionaires
  | SetBillionaires
  | UpdateBillionaire
  | UpdateItem;
