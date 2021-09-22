import React from "react";

import {Candidate} from "../../types/candidate";

import styles from "./CandidateCard.module.scss";

type CardProp = {
  c: Candidate;
  mover: (c: Candidate, d: string) => void;
};

function CandidateCard({c, mover}: CardProp) {
  const handleStateLeft = () => {
    mover(c, "left");
  };
  const handleStateRight = () => {
    mover(c, "right");
  };
  const handleStateDel = () => {
    mover(c, "del");
  };

  return (
    <div className={styles.container}>
      <div>
        <p>{c.name}</p>
        <p className={styles.comentario}>{c.contacto}</p>
        <p className={styles.comentario}>{c.comments}</p>
      </div>
      <div className={styles.btnContainer}>
        <div>
          <button onClick={handleStateLeft}> {"<"} </button>
          <button onClick={handleStateRight}> {">"} </button>
        </div>
        <button onClick={handleStateDel}>X</button>
      </div>
    </div>
  );
}

export default CandidateCard;
