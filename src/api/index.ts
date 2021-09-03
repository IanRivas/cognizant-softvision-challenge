import {Candidate} from "../types/candidate";

import data from "./candidates.json";

export default {
  candidates: {
    list: (): Promise<Candidate[]> => Promise.resolve(data),
  },
};
