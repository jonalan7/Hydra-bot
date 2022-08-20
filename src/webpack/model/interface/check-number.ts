import { id } from './id';
export interface checkNumber {
  status: number;
  numberExists: boolean;
  connection?: string;
  text?: string;
  id: id;
}
