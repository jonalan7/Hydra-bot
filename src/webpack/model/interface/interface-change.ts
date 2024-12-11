import { InterfaceMode, InterfaceState } from '../enum';
import { ReactionIntro, InterfaceQrcode } from '../interface';

interface ResultInfo {
  displayInfo: InterfaceState;
  mode: InterfaceMode;
  info: InterfaceState;
}

export interface InterfaceChange {
  onType: string;
  session: string;
  result: Partial<ResultInfo> &
    Partial<ReactionIntro> &
    Partial<InterfaceQrcode>;
  // Qrcode
  error?: boolean;
  qrcode?: string;
  base64Image?: string;
}
