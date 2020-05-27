import React from "react";
import classNames from "classnames/bind";
import { Billionaire } from "../../types/types";
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
        data-cy="chooseBillionaireBtn"
        className={cx("imageContainer")}
        tabIndex={0}
        role="button"
        onClick={toggleModal}
        onKeyUp={toggleModal}
      >
        <img
          data-cy="billionaireThumbnail"
          alt={currentBillionaire.name}
          src={currentBillionaire.imageSrc}
        />
      </div>
      <p data-cy="madeBy" className={cx("madeBy")}>
        by Chris Martin
      </p>
    </header>
  );
};
