import { OnMode } from '../enum';
export interface InterfaceQrcode {
  error: boolean;
  qrcode: string;
  base64Image: string;
  urlCode: string;
  onType: OnMode.qrcode;
  session: string;
}

export type OptionalInterfaceQrcode = Partial<InterfaceQrcode>;
