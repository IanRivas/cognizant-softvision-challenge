export interface Candidate {
  id?: string;
  name?: string;
  // step: "Entrevista inicial" | "Entrevista técnica" | "Oferta" | "Asignación" | "Rechazo";
  step?: string;
  comments?: string;
}
