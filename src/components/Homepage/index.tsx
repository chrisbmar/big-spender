import React from "react";
import classNames from "classnames/bind";
import { Billionaire } from "../../types/types";
import styles from "./Homepage.scss";

const cx = classNames.bind(styles);

interface HomepageProps {
  currentBillionaire: Billionaire;
}

export const Homepage: React.FC<HomepageProps> = ({ currentBillionaire }) => {
  return (
    <main className={cx("homepage")}>
      <section>
        <h1 data-cy="currentBillionaireName" className={cx("name")}>
          {currentBillionaire.name.toUpperCase()}
        </h1>
        <div data-cy="currentBillionaireIntro" className={cx("introduction")}>
          {currentBillionaire.introduction}
        </div>
      </section>
    </main>
  );
};
