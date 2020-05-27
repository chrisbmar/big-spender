import React from "react";
import classNames from "classnames/bind";
import { Item } from "../../types/types";
import styles from "./Items.scss";
import { formatNumber } from "../../utility/formatNumber";

const cx = classNames.bind(styles);

interface ItemsProps {
  items: Item[];
  totalMoney: number;
  updateItem(item: Item, quantity: number): void;
}

export const Items: React.FC<ItemsProps> = ({
  items,
  totalMoney,
  updateItem,
}) => {
  const onUpdateItemByOne = (item: Item, quantity: number): void => {
    const newQuantity = item.quantity + quantity;
    updateItem(item, newQuantity);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: Item
  ): void => {
    const currentQuantity = item.quantity;
    const requestedQuantity = +e.target.value;

    // this check stops unnecessary action dispatches and to see if the user can afford the requested quantity
    if (
      (currentQuantity !== 0 || e.target.value.length !== 0) &&
      totalMoney + currentQuantity * item.cost > item.cost * requestedQuantity
    ) {
      updateItem(item, requestedQuantity);
    }
  };

  const card = items.map((item) => {
    const canBuy = totalMoney - item.cost >= 0;
    const canSell = item.quantity > 0;

    return (
      <div data-cy="items" key={item.cost} className={cx("card")}>
        <img alt={item.name} src={item.src} />
        <div className={cx("itemInfo")}>
          <span className={cx("itemCost")}>${formatNumber(item.cost)}</span>
          <p className={cx("itemName")}>{item.name}</p>
          <div className={cx("buttonAndInput")}>
            <button
              data-cy="sellButton"
              disabled={!canSell}
              className={cx({ canSell })}
              type="button"
              onClick={(): void => onUpdateItemByOne(item, -1)}
            >
              SELL
            </button>
            <input
              value={item.quantity === 0 ? "" : item.quantity}
              type="text"
              onChange={(e): void => onInputChange(e, item)}
            />
            <button
              data-cy="buyButton"
              disabled={!canBuy}
              className={cx({ canBuy })}
              type="button"
              onClick={(): void => onUpdateItemByOne(item, 1)}
            >
              BUY
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={cx("container")}>
      <div className={cx("items")}>{card}</div>
    </div>
  );
};
