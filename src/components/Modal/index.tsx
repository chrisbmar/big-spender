import React from "react";
import classNames from "classnames/bind";
import { DisplayBillionaires } from "../DisplayBillionaires";
import { Backdrop } from "../Backdrop/index";
import { Billionaire } from "../../types/types";
import styles from "./Modal.scss";

const cx = classNames.bind(styles);

interface ModalProps {
  showModal: boolean;
  billionaires: Billionaire[];
  updateBillionaire(billionaire: Billionaire): void;
  toggleModal(): void;
}

export const Modal: React.FC<ModalProps> = ({
  showModal,
  billionaires,
  updateBillionaire,
  toggleModal,
}) => {
  return (
    <>
      {showModal && <Backdrop toggleModal={toggleModal} />}
      <div
        data-cy="modal"
        className={cx("modal")}
        style={{
          transform: showModal ? "translateY(0)" : "translateY(-100vh)",
          opacity: showModal ? "1" : "0",
        }}
      >
        <DisplayBillionaires
          billionaires={billionaires}
          updateBillionaire={updateBillionaire}
          toggleModal={toggleModal}
        />
      </div>
    </>
  );
};
