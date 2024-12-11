export interface LoginForm {
  email: string;
  password: string;
}

export interface AuditorRegForm {
  name: string;
  email: string;
  password: string;
  teamName?: string;
  auditRole?: "IT auditor";
}

export interface LoginResponse {
  message: string;
  token: string;
  data: AuditorDataResponse;
}

interface UserData {
  username: string;
  email: string;
  profilePicture?: string;
  userType: "ADMIN" | "AUDITOR";
  role?: "Admin" | "Auditor";
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditorDataResponse extends UserData {
  name: string;
  teamName: string;
  auditRole?: "IT auditor";
}

export type RegisterResponse = Omit<LoginResponse, "token">;
