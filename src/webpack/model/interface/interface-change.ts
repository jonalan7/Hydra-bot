import { InterfaceMode } from '../enum';
import { ReactionIntro, InterfaceQrcode } from '../interface';
interface ResultInfo {
  displayInfo: string;
  mode: InterfaceMode;
  info: string;
}

export interface interfaceChange {
  onType: string;
  session: string;
  result: Partial<ResultInfo> &
    Partial<ReactionIntro> &
    Partial<InterfaceQrcode>;
}
