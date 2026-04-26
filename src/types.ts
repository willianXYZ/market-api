export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  createdBy: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
}
