import { IdMessage } from './id-message';
import { ReactionType } from '../enum/reaction-type';

interface BaseReaction {
  ack: number;
  msgKey: string;
  orphan: number;
  parentMsgKey: string;
  reactionText: string;
  read: boolean;
  senderUserJid: string;
  timestamp: number;
}

interface ReactionByMe extends BaseReaction {}

interface Sender extends BaseReaction {
  id: IdMessage;
  isFailed: boolean;
  isSendFailure: boolean;
}

interface Senders {
  aggregateEmoji: string;
  hasReactionByMe: boolean;
  sender: Sender[];
}

export interface ReactionIntro {
  id: IdMessage;
  index: Record<string, any>[];
  reactionByMe: ReactionByMe;
  type: ReactionType;
  senders: Senders[];
}
