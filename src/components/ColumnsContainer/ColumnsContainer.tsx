import React, {useEffect, useState} from "react";

import {Candidate} from "../../types/candidate";
import Column from "../Column";
import Modal from "../Modal";

import styles from "./ColumnsCon.module.scss";

type props = {
  cand: Array<Candidate>;
};

const localChange = (c: Candidate, action: string = "change") => {
  let item: string | null = "";
  let itemN = [];

  item = localStorage.getItem("postulaciones");
  itemN = JSON.parse(item as string);
  itemN = itemN.filter((clocal: Candidate) => clocal.id !== c.id);
  if (action === "change") {
    itemN.push(c);
  }
  localStorage.setItem("postulaciones", JSON.stringify(itemN));
};

function ColumnsContainer({cand}: props) {
  const [cv, setCV] = useState<Candidate[]>([]);
  const [inicial, setInicial] = useState<Candidate[]>([]);
  const [tecnica, setTecnica] = useState<Candidate[]>([]);
  const [rechazo, setRechazo] = useState<Candidate[]>([]);
  const [oferta, setOferta] = useState<Candidate[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    for (let i = 0; i < cand.length; i++) {
      if (cand[i].step == "Envié CV") {
        setCV((prev) => {
          return [...prev, cand[i]];
        });
      } else if (cand[i].step == "Entrevista Inicial") {
        setInicial((prev) => {
          return [...prev, cand[i]];
        });
      } else if (cand[i].step == "Entrevista Técnica") {
        setTecnica((prev) => {
          return [...prev, cand[i]];
        });
      } else if (cand[i].step == "Rechazo") {
        setRechazo((prev) => {
          return [...prev, cand[i]];
        });
      } else if (cand[i].step == "Oferta") {
        setOferta((prev) => {
          return [...prev, cand[i]];
        });
      }
    }
  }, [cand]);

  const movercv = (c: Candidate, d: string) => {
    if (d === "left") {
      return;
    } else if (d === "right") {
      setCV((prev) => prev.filter((can) => can.id !== c.id));
      c.step = "Entrevista Inicial";
      localChange(c);
      setInicial((prev) => [...prev, c]);
    } else if (d === "del") {
      localChange(c, "del");
      setCV((prev) => prev.filter((can) => can.id !== c.id));
    }
  };
  const moverInicial = (c: Candidate, d: string) => {
    setInicial((prev) => prev.filter((can) => can.id !== c.id));
    if (d === "left") {
      c.step = "Envié CV";
      localChange(c);
      setCV((prev) => [...prev, c]);
    } else if (d === "right") {
      c.step = "Entrevista Técnica";
      localChange(c);
      setTecnica((prev) => [...prev, c]);
    } else if (d === "del") {
      localChange(c, "del");

      return;
    }
  };
  const moverTecnica = (c: Candidate, d: string) => {
    setTecnica((prev) => prev.filter((can) => can.id !== c.id));
    if (d === "left") {
      c.step = "Entrevista Inicial";
      localChange(c);
      setInicial((prev) => [...prev, c]);
    } else if (d === "right") {
      c.step = "Rechazo";
      localChange(c);
      setRechazo((prev) => [...prev, c]);
    } else if (d === "del") {
      localChange(c, "del");

      return;
    }
  };
  const moverRechazo = (c: Candidate, d: string) => {
    setRechazo((prev) => prev.filter((can) => can.id !== c.id));
    if (d === "left") {
      c.step = "Entrevista Técnica";
      localChange(c);
      setTecnica((prev) => [...prev, c]);
    } else if (d === "right") {
      c.step = "Oferta";
      localChange(c);
      setOferta((prev) => [...prev, c]);
    } else if (d === "del") {
      localChange(c, "del");

      return;
    }
  };
  const moverOferta = (c: Candidate, d: string) => {
    if (d === "left") {
      setOferta((prev) => prev.filter((can) => can.id !== c.id));
      c.step = "Rechazo";
      localChange(c);
      setRechazo((prev) => [...prev, c]);
    } else if (d === "right") {
      return;
    } else if (d === "del") {
      localChange(c, "del");
      setOferta((prev) => prev.filter((can) => can.id !== c.id));
    }
  };
  const addCandi = (c: Candidate) => {
    setCV((prev) => [...prev, c]);
  };

  const handleModal = () => {
    return setShow(!show);
  };

  return (
    <div className={styles.container}>
      <Column candi={cv} columnTitle="Envié CV" mover={movercv}>
        <button className={styles.buttonAgregar} onClick={handleModal}>
          Agregar Postulación
        </button>
      </Column>
      <Column candi={inicial} columnTitle="Entrevista Inicial" mover={moverInicial} />
      <Column candi={tecnica} columnTitle="Entrevista Técnica" mover={moverTecnica} />
      <Column candi={rechazo} columnTitle="Rechazo" mover={moverRechazo} />
      <Column candi={oferta} columnTitle="Oferta" mover={moverOferta} />
      <Modal add={addCandi} handle={handleModal} show={show} />
    </div>
  );
}

export default ColumnsContainer;
