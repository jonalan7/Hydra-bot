import { Id } from './id';

export interface CheckNumber {
  status: number;
  numberExists: boolean;
  connection: string;
  text: string;
  id: Id;
}

export type OptionalCheckNumber = Partial<CheckNumber>;
