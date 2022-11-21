export interface PersonReport {
  id?: number;
  email: string;
  longName: string;
  phoneNumber: string;
  role: string;
  profile: string;
  seniorityName: string;
  provider: string;
  celula: string | null;
  product: string | null;
  poCelula?: string;
  assignmentStartDate: string | null;
  tentativeAssignmentEndDate: string | null;
  allocationPercentage: number | null;
  idTribu: number;
  tribu: string;
  typeRoleTribu: string;
  leaderTribu: string;
  leaderTechnicalTribu?: string;
  originProvider?: string
}
