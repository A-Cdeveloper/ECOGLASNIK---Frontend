export type Position = {
  lat: number;
  lng: number;
};

export type ProblemCategory = {
  cat_id: number;
  cat_name: string;
};

export type Problem = {
  id: string;
  title: string;
  description: string;
  position: Position;
  createdAt: Date;
  updatedAt?: Date | null;
  status: "active" | "done";
  cat_id: number;
  uid: number;
  image: string | null;
};

export type ExtendedProblem = Problem & {
  user: Pick<User, "firstname" | "lastname" | "email">;
};

export type Problems = Problem[];

export type User = {
  uid: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  accessToken: string | null;
  refreshToken: string | null;
  createdAt: Date;
};

export type Users = User[];
