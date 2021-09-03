import React, {useRef, useState} from "react";
import {nanoid} from "nanoid";

import "./Modal.scss";
import {Candidate} from "../../types/candidate";

type ModalProps = {
  show: boolean;
  handle: () => void;
  add: (c: Candidate) => void;
};

function Modal({show, add, handle}: ModalProps) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const nameRef = useRef<HTMLInputElement | null>(null);
  const commentsRef = useRef<HTMLInputElement | null>(null);
  const [textName, setTextname] = useState("");
  const [textComment, setTextcomment] = useState("");

  const addCandidate = () => {
    const c: Candidate | null = {
      id: nanoid(),
      name: nameRef.current?.value,
      step: "Entrevista inicial",
      comments: commentsRef.current?.value,
    };

    add(c);
    setTextname("");
    setTextcomment("");
    handle();
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div>
          <h4>Agregar Candidato</h4>
          <button className="closebtn" onClick={handle}>
            X
          </button>
        </div>
        <div className="inputModal">
          <span>Name:</span>
          <input
            ref={nameRef}
            type="text"
            value={textName}
            onChange={(e) => setTextname(e.target.value)}
          />
        </div>
        <div className="inputModal">
          <span>Commets:</span>
          <input
            ref={commentsRef}
            type="text"
            value={textComment}
            onChange={(e) => setTextcomment(e.target.value)}
          />
        </div>
        <button className="btnAgregar" onClick={addCandidate}>
          Agregar
        </button>
      </section>
    </div>
  );
}

export default Modal;
