import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReducerModel, Billionaire, Item } from "../../types/types";
import * as actions from "../../store/actions/actions";
import { Homepage } from "../Homepage/index";
import { Header } from "../Header/index";
import { Modal } from "../Modal/index";
import { TotalMoney } from "../TotalMoney/index";
import { Introduction } from "../Introduction/index";
import { Items } from "../Items/index";

export const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const initBillionaires = useCallback((): void => {
    dispatch(actions.initBillionaires());
  }, []);

  useEffect(() => {
    initBillionaires();
  }, [initBillionaires]);

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  const items = useSelector((state: ReducerModel) => state.items);
  const totalMoney = useSelector((state: ReducerModel) => state.totalMoney);
  const billionaires = useSelector((state: ReducerModel) => state.billionaires);
  const currentBillionaire = useSelector(
    (state: ReducerModel) => state.currentBillionaire
  );

  const updateBillionaire = (billionaire: Billionaire): void => {
    dispatch(actions.updateBillionaire(billionaire));
  };
  const updateItem = (item: Item, quantity: number): void => {
    dispatch(actions.updateItem(item, quantity));
  };

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
