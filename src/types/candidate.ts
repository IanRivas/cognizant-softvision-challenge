export interface Candidate {
  id?: string;
  name?: string;
  // step: "Envié CV" | "Entrevista Inicial" | "Entrevista Técnica" | "Rechazo" | "Oferta";
  step?: string;
  comments?: string;
  contacto?: string;
}
