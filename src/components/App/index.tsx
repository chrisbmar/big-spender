import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ItemReducerModel, Billionaire, Item } from "../../types/types";
import * as actions from "../../store/actions/actions";
import { Homepage } from "../Homepage/index";
import { Header } from "../Header/index";
import { Modal } from "../Modal/index";
import { TotalMoney } from "../TotalMoney/index";
import { Introduction } from "../Introduction/index";
import { Items } from "../Items/index";

export const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  const items = useSelector((state: ItemReducerModel) => state.items);
  const totalMoney = useSelector((state: ItemReducerModel) => state.totalMoney);
  const billionaires = useSelector(
    (state: ItemReducerModel) => state.billionaires
  );
  const currentBillionaire = useSelector(
    (state: ItemReducerModel) => state.currentBillionaire
  );

  // actions
  const dispatch = useDispatch();
  const initBillionaires = useCallback((): void => {
    dispatch(actions.initBillionaires());
  }, []);
  const updateBillionaire = (billionaire: Billionaire): void => {
    dispatch(actions.updateBillionaire(billionaire));
  };
  const updateItem = (item: Item, quantity: number): void => {
    dispatch(actions.updateItem(item, quantity));
  };

  useEffect(() => {
    initBillionaires();
  }, [initBillionaires]);

  return (
    <>
      <Header
        currentBillionaire={currentBillionaire}
        toggleModal={toggleModal}
      />
      <Homepage currentBillionaire={currentBillionaire} />
      <Modal
        toggleModal={toggleModal}
        billionaires={billionaires}
        updateBillionaire={updateBillionaire}
        showModal={showModal}
      />
      <TotalMoney totalMoney={totalMoney} />
      <Introduction />
      <Items items={items} totalMoney={totalMoney} updateItem={updateItem} />
    </>
  );
};
