import { Id } from './id';

export interface Contact {
  id: Id;
  pushname: string;
  type: string;
  labels: string[];
  isContactSyncCompleted: number;
  formattedName: string;
  displayName: string;
  formattedShortName: string;
  formattedShortNameWithNonBreakingSpaces: string;
  isMe: boolean;
  mentionName: string;
  notifyName: string;
  isMyContact: boolean;
  isPSA: boolean;
  isUser: boolean;
  isWAContact: boolean;
  profilePicThumbObj: object;
  msg: string;
}
