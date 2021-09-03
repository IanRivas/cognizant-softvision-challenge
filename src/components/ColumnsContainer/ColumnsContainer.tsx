import React, {useEffect, useState} from "react";

import {Candidate} from "../../types/candidate";
import Column from "../Column";
import Modal from "../Modal";

import styles from "./ColumnsCon.module.scss";

function ColumnsContainer(candidates: Array<Candidate>) {
  const [inicial, setInicial] = useState<Candidate[]>([]);
  const [tecnica, setTecnica] = useState<Candidate[]>([]);
  const [oferta, setOferta] = useState<Candidate[]>([]);
  const [asignacion, setAsignacion] = useState<Candidate[]>([]);
  const [rechazo, setRechazo] = useState<Candidate[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    for (const c in candidates) {
      if (candidates[c].step == "Entrevista inicial") {
        setInicial((prev) => {
          return [...prev, candidates[c]];
        });
      } else if (candidates[c].step == "Entrevista técnica") {
        setTecnica((prev) => {
          return [...prev, candidates[c]];
        });
      } else if (candidates[c].step == "Oferta") {
        setOferta((prev) => {
          return [...prev, candidates[c]];
        });
      } else if (candidates[c].step == "Asignación") {
        setAsignacion((prev) => {
          return [...prev, candidates[c]];
        });
      } else if (candidates[c].step == "Rechazo") {
        setRechazo((prev) => {
          return [...prev, candidates[c]];
        });
      }
    }
  }, [candidates]);

  const moverInicial = (c: Candidate, d: string) => {
    if (d === "left") {
      return;
    } else if (d === "right") {
      setInicial((prev) => prev.filter((can) => can.id !== c.id));
      setTecnica((prev) => [...prev, c]);
    }
  };
  const moverTecnica = (c: Candidate, d: string) => {
    setTecnica((prev) => prev.filter((can) => can.id !== c.id));
    if (d === "left") {
      setInicial((prev) => [...prev, c]);
    } else if (d === "right") {
      setOferta((prev) => [...prev, c]);
    }
  };
  const moverOferta = (c: Candidate, d: string) => {
    setOferta((prev) => prev.filter((can) => can.id !== c.id));
    if (d === "left") {
      setTecnica((prev) => [...prev, c]);
    } else if (d === "right") {
      setAsignacion((prev) => [...prev, c]);
    }
  };
  const moverAsignacion = (c: Candidate, d: string) => {
    setAsignacion((prev) => prev.filter((can) => can.id !== c.id));
    if (d === "left") {
      setOferta((prev) => [...prev, c]);
    } else if (d === "right") {
      setRechazo((prev) => [...prev, c]);
    }
  };
  const moverRechazo = (c: Candidate, d: string) => {
    if (d === "left") {
      setRechazo((prev) => prev.filter((can) => can.id !== c.id));
      setAsignacion((prev) => [...prev, c]);
    } else if (d === "right") {
      return;
    }
  };
  const addCandi = (c: Candidate) => {
    setInicial((prev) => [...prev, c]);
  };
  const handleModal = () => {
    if (show === true) {
      setShow(false);
    } else if (show === false) {
      setShow(true);
    }
  };

  return (
    <div className={styles.container}>
      <Column candi={inicial} columnTitle="Entrevista Inicial" mover={moverInicial}>
        <button className={styles.buttonAgregar} onClick={handleModal}>
          Agregar Candidato
        </button>
      </Column>
      <Column candi={tecnica} columnTitle="Entrevista Técnica" mover={moverTecnica} />
      <Column candi={oferta} columnTitle="Oferta" mover={moverOferta} />
      <Column candi={asignacion} columnTitle="Asignación" mover={moverAsignacion} />
      <Column candi={rechazo} columnTitle="Rechazo" mover={moverRechazo} />
      <Modal add={addCandi} handle={handleModal} show={show} />
    </div>
  );
}

export default ColumnsContainer;
