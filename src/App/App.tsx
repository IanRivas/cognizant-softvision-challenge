import React, {useState, useEffect} from "react";

import {Candidate} from "../types/candidate";
import ColumnsContainer from "../components/ColumnsContainer";
import api from "../api";

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    (async function () {
      const candidateApi = await api.candidates.list();

      setCandidates(candidateApi);
    })();
  });

  return (
    <main>
      <ColumnsContainer {...candidates} />
    </main>
  );
}

export default App;
