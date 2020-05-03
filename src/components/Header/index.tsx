import React from "react";
import classNames from "classnames/bind";
import { Billionaire } from "../../store/items/types";
import styles from "./Header.scss";

const cx = classNames.bind(styles);

interface HeaderProps {
  currentBillionaire: Billionaire;
  toggleModal(): void;
}

export const Header: React.FC<HeaderProps> = ({
  currentBillionaire,
  toggleModal,
}) => {
  return (
    <header className={cx("header")}>
      <div
        className={cx("imageContainer")}
        tabIndex={0}
        role="button"
        onClick={toggleModal}
        onKeyUp={toggleModal}
      >
        <img alt={currentBillionaire.name} src={currentBillionaire.imageSrc} />
      </div>
      <p className={cx("madeBy")}>
        <span className={cx("light-yellow")}>by</span> Chris Martin
      </p>
    </header>
  );
};
