import React from "react";

import {Candidate} from "../../types/candidate";
import CandidateCard from "../CandidateCard";

import styles from "./Column.module.scss";

type columnProps = {
  columnTitle: string;
  children?: React.ReactNode;
  candi: Candidate[];
  mover: (c: Candidate, d: string) => void;
};

function Column({columnTitle, children, candi, mover}: columnProps) {
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{columnTitle}</h5>
      {candi.length == 0 ? (
        <p className={styles.noHay}>No hay candidatos</p>
      ) : (
        candi.map((c, index) => {
          return <CandidateCard key={index} c={c} mover={mover} />;
        })
      )}
      {children}
    </div>
  );
}

export default Column;
