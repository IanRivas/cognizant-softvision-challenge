import React, {useRef, useState} from "react";
import {nanoid} from "nanoid";

import {Candidate} from "../../types/candidate";

import styles from "./Modal.module.scss";

type ModalProps = {
  show: boolean;
  handle: () => void;
  add: (c: Candidate) => void;
};

function Modal({show, add, handle}: ModalProps) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const commentsRef = useRef<HTMLInputElement | null>(null);
  const contactRef = useRef<HTMLInputElement | null>(null);
  const [textName, setTextname] = useState("");
  const [textComment, setTextcomment] = useState("");
  const [textContact, setTextContact] = useState("");

  const addCandidate = () => {
    const c: Candidate | null = {
      id: nanoid(),
      name: nameRef.current?.value,
      step: "Envié CV",
      contacto: contactRef.current?.value,
      comments: commentsRef.current?.value,
    };

    add(c);
    let item: string | null = "";
    let itemN = [];

    item = localStorage.getItem("postulaciones");
    if (item !== null) {
      itemN = JSON.parse(item);
    }
    itemN.push(c);
    localStorage.setItem("postulaciones", JSON.stringify(itemN));
    setTextname("");
    setTextcomment("");
    setTextContact("");
    handle();
  };

  return (
    <div className={show ? styles.modal : styles.modalN}>
      <div className={styles.exit} onClick={handle}>
        {""}
      </div>
      <section className={styles.modalMain}>
        <div>
          <h4>Agregar Postulación</h4>
          <button className={styles.closebtn} onClick={handle}>
            X
          </button>
        </div>
        <div className={styles.inputModal}>
          <span>Empresa:</span>
          <input
            ref={nameRef}
            type="text"
            value={textName}
            onChange={(e) => setTextname(e.target.value)}
          />
        </div>
        <div className={styles.inputModal}>
          <span>Contacto:</span>
          <input
            ref={contactRef}
            type="text"
            value={textContact}
            onChange={(e) => setTextContact(e.target.value)}
          />
        </div>
        <div className={styles.inputModal}>
          <span>Comentario:</span>
          <input
            ref={commentsRef}
            type="text"
            value={textComment}
            onChange={(e) => setTextcomment(e.target.value)}
          />
        </div>
        <button className={styles.btnAgregar} onClick={addCandidate}>
          Agregar
        </button>
      </section>
    </div>
  );
}

export default Modal;
