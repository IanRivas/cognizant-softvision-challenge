import React, {useState, useEffect} from "react";

import {Candidate} from "../types/candidate";
import ColumnsContainer from "../components/ColumnsContainer";
import api from "../api";

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    (async function () {
      const candidateApi: Array<Candidate> = await api.candidates.list();
      let item: string | null = "";
      let itemN = [];

      item = localStorage.getItem("postulaciones");
      if (item !== null) {
        itemN = JSON.parse(item);
      }
      if (itemN.length !== 0) {
        setCandidates(itemN);
      } else {
        setCandidates(candidateApi);
      }
    })();
  }, []);

  return (
    <main>
      <ColumnsContainer cand={candidates} />
    </main>
  );
}

export default App;
