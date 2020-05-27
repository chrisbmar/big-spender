import images from "../../utility/images";
import * as actionTypes from "../actions/actionTypes";

import {
  ItemReducerModel,
  ItemActionTypes,
  UpdateItem,
  UpdateBillionaire,
  SetBillionaires,
  Billionaire,
} from "../../types/types";

const initialState: ItemReducerModel = {
  totalMoney: 1000,
  billionaires: [],
  currentBillionaire: {
    name: "",
    totalMoney: 0,
    introduction: "",
    imageSrc: "",
    wealthSource: "",
  },
  items: [
    { name: "Your friends Netflix", quantity: 0, cost: 0, src: images.netflix },
    { name: "Fries", quantity: 0, cost: 2, src: images.fries },
    { name: "Plant", quantity: 0, cost: 15, src: images.plant },
    { name: "Playstation", quantity: 0, cost: 400, src: images.playstation },
    { name: "Second-hand car", quantity: 0, cost: 1200, src: images.car },
    { name: "Burberry Trench Coat", quantity: 0, cost: 2000, src: images.coat },
    { name: "Boob job", quantity: 0, cost: 5000, src: images.boobjob },
    { name: "VW Campervan", quantity: 0, cost: 40000, src: images.campervan },
    { name: "Birkin bag", quantity: 0, cost: 100000, src: images.birkinbag },
    {
      name: "Ticket to space",
      quantity: 0,
      cost: 250000,
      src: images.ticket,
    },
    {
      name: "A country's citizenship",
      quantity: 0,
      cost: 1000000,
      src: images.citizenship,
    },
    { name: "Beach House", quantity: 0, cost: 5000000, src: images.beachHouse },
    { name: "Forumla 1 car", quantity: 0, cost: 15500000, src: images.f1car },
    { name: "Private jet", quantity: 0, cost: 35000000, src: images.airplane },
    { name: "Necker Island", quantity: 0, cost: 60000000, src: images.island },
    {
      name: "Washington Post",
      quantity: 0,
      cost: 250000000,
      src: images.washingtonpost,
    },
    { name: "Super yacht", quantity: 0, cost: 600000000, src: images.yacht },
    {
      name: "Kylie Cosmetics",
      quantity: 0,
      cost: 900000000,
      src: images.cosmetics,
    },
    {
      name: "Antilia house",
      quantity: 0,
      cost: 1000000000,
      src: images.antilia,
    },
    { name: "Yeezy brand", quantity: 0, cost: 3000000000, src: images.yeezy },
    { name: "Real Madrid", quantity: 0, cost: 3600000000, src: images.madrid },
    {
      name: "Manchester United",
      quantity: 0,
      cost: 3800000000,
      src: images.manutd,
    },
    { name: "Barcelona", quantity: 0, cost: 4000000000, src: images.barcelona },
    { name: "LA Lakers", quantity: 0, cost: 4400000000, src: images.lakers },
  ],
};

const onUpdateItem = (
  state: ItemReducerModel,
  action: UpdateItem
): ItemReducerModel => {
  const newQuantity = action.payload.quantity;
  const indexOfItemToUpdate = state.items.findIndex(
    (item) => item.name === action.payload.item.name
  );

  const itemsCopy = [...state.items];
  const itemToUpdate = itemsCopy[indexOfItemToUpdate];
  const updatedItem = { ...itemToUpdate, quantity: newQuantity };
  itemsCopy.splice(indexOfItemToUpdate, 1, updatedItem);

  const updatedTotalMoney =
    state.totalMoney +
    itemToUpdate.cost * itemToUpdate.quantity -
    itemToUpdate.cost * newQuantity;

  return {
    totalMoney: updatedTotalMoney,
    billionaires: state.billionaires,
    currentBillionaire: state.currentBillionaire,
    items: itemsCopy,
  };
};

const onUpdateBillionaire = (
  state: ItemReducerModel,
  action: UpdateBillionaire
): ItemReducerModel => {
  const currentBillionaire: { currentBillionaire: Billionaire } = {
    currentBillionaire: {
      name: action.billionaire.name,
      totalMoney: action.billionaire.totalMoney,
      introduction: action.billionaire.introduction,
      imageSrc: action.billionaire.imageSrc,
      wealthSource: action.billionaire.wealthSource,
    },
  };
  const updateTotalMoney = {
    totalMoney: action.billionaire.totalMoney,
  };
  return {
    ...state,
    ...currentBillionaire,
    ...updateTotalMoney,
  };
};

const onSetBillionaires = (
  state: ItemReducerModel,
  action: SetBillionaires
): ItemReducerModel => {
  const updatedBillionaireState = {
    billionaires: action.billionaires,
  };
  return {
    ...state,
    ...updatedBillionaireState,
  };
};

export const itemReducer = (
  state = initialState,
  action: ItemActionTypes
): ItemReducerModel => {
  switch (action.type) {
    case actionTypes.SET_BILLIONAIRES:
      return onSetBillionaires(state, action);
    case actionTypes.UPDATE_ITEM:
      return onUpdateItem(state, action);
    case actionTypes.UPDATE_BILLIONAIRE:
      return onUpdateBillionaire(state, action);
    default:
      return state;
  }
};
