import { Item, ActionsModel, Billionaire } from "../../types/types";
import * as actionTypes from "./actionTypes";

export const updateItem = (item: Item, quantity: number): ActionsModel => {
  return {
    type: actionTypes.UPDATE_ITEM,
    payload: {
      item,
      quantity,
    },
  };
};

export const updateBillionaire = (billionaire: Billionaire): ActionsModel => {
  return {
    type: actionTypes.UPDATE_BILLIONAIRE,
    billionaire,
  };
};

export const initBillionaires = (): ActionsModel => {
  // make async request to fetch the billionaires from API and then add it to the return object
  return {
    type: actionTypes.INIT_BILLIONAIRES,
  };
};

export const setBillionaires = (billionaires: Billionaire[]): ActionsModel => {
  return {
    type: actionTypes.SET_BILLIONAIRES,
    billionaires,
  };
};
