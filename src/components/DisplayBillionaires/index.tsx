import React, { useEffect } from "react";
import classNames from "classnames/bind";
import { Billionaire } from "../../types/types";
import { formatNumber } from "../../utility/formatNumber";
import chrisImage from "../../assets/images/chris.jpg";
import styles from "./DisplayBillionaires.scss";

const cx = classNames.bind(styles);

interface DisplayBillionairesProps {
  billionaires: Billionaire[];
  updateBillionaire(billionaire: Billionaire): void;
  toggleModal(): void;
}

export const DisplayBillionaires: React.FC<DisplayBillionairesProps> = ({
  billionaires,
  updateBillionaire,
  toggleModal,
}) => {
  useEffect(() => {
    const chris: Billionaire = {
      name: "Chris Martin",
      totalMoney: 100,
      imageSrc: chrisImage,
      wealthSource: "Broke",
      introduction: `A frontend developer based in Barcelona. 
      Currently working in Europe’s leading on-demand logistics 
      platform which connects businesses, customers and couriers 
      to revolutionise the way goods are transported.`,
    };

    billionaires.push(chris);
  }, [billionaires]);

  const onUpdateBillionaire = (billionaire: Billionaire): void => {
    updateBillionaire(billionaire);
    toggleModal();
  };

  return (
    <div className={cx("billionairesTable")}>
      <div className={cx("title")}>
        <p>Forbes&apos; Current Top 10 Billionaires</p>
        <div
          data-cy="closeModal"
          tabIndex={0}
          role="button"
          className={cx("close")}
          onClick={toggleModal}
          onKeyUp={toggleModal}
        >
          <i className="fas fa-times" />
        </div>
      </div>
      {billionaires.map((billionaire) => (
        <div
          data-cy="billionaireTable"
          key={billionaire.totalMoney}
          className={cx("row")}
        >
          <div className={cx("imageNameMoney")}>
            <img alt="billionaire" src={billionaire.imageSrc} />
            <div className={cx("nameMoney")}>
              <span>{billionaire.name}</span>
              <span
                data-cy="billionaireTotalMoney"
                className={cx("totalMoney")}
              >
                <strong>{`$${formatNumber(billionaire.totalMoney)}`}</strong>
              </span>
            </div>
          </div>
          <div data-cy="wealthSource" className={cx("wealthSource")}>
            {billionaire.wealthSource}
          </div>
          <div className={cx("buttonContainer")}>
            <button
              data-cy="selectBillionaireBtn"
              type="button"
              onClick={(): void => onUpdateBillionaire(billionaire)}
            >
              SELECT
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
