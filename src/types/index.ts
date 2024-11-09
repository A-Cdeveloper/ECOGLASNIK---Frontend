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
  image: string;
};

export type Problems = Problem[];

export type User = {
  id: number;
  uid: number;
  name: string;
  email: string;
};

export type Users = User[];
