export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: UserType;
  address: UserAddress;
}

export interface UserAddress {
  number: string;
  street: string;
  city: string;
  zipcode: string;
}

export enum UserType {
  CUSTOMER = 'CUSTOMER',
  MANAGER = 'MANAGER',
}
