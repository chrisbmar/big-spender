import React, { useEffect } from "react";
import classNames from "classnames/bind";
import { Billionaire } from "../../store/items/types";
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
      introduction: [
        "A frontend developer currently based in Barcelona.",
        "Originally from Glasgow, Scotland and graduated from the University of Stirling with a B.A. Hons. in Sports Studies.",
        "Currently working for Stuart, Europe’s leading on-demand logistics platform which connects businesses to a fleet of geolocalised independent couriers.",
      ],
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
        <div key={billionaire.totalMoney} className={cx("row")}>
          <div className={cx("imageNameMoney")}>
            <img alt="billionaire" src={billionaire.imageSrc} />
            <div className={cx("nameMoney")}>
              <span>{billionaire.name}</span>
              <span className={cx("totalMoney")}>
                <strong>{`$${formatNumber(billionaire.totalMoney)}`}</strong>
              </span>
            </div>
          </div>
          <div className={cx("wealthSource")}>{billionaire.wealthSource}</div>
          <div className={cx("buttonContainer")}>
            <button
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
