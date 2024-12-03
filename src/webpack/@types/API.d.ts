// Importações organizadas por categoria

// Interfaces
import {
  InterfaceHost,
  InterfaceScope,
  contact,
  checkNumber,
  ReactionIntro,
} from '../model/interface';

// Funcionalidades específicas
import { interfaceChange } from '../model/interface/interface-change';

// Declaração da interface API organizada por categoria
interface API {
  // Mensagens
  /**
   * Send a message to a contact or group
   */
  sendMessage: (to: string, body: string, options: object) => Promise<any>;

  /**
   * Serialize a message object
   */
  serializeMessageObj: (msg: object) => Promise<void>;

  // Contatos
  /**
   * Returns a list of all contacts
   */
  getAllContacts: () => Promise<contact>;

  // Grupos
  /**
   * Get all chat groups
   */
  getAllChatsGroups: () => Promise<any>;

  /**
   * Creates a new chat group
   */
  createGroup: (
    groupName: string,
    contacts: string | string[]
  ) => Promise<InterfaceScope>;

  /**
   * Add participants to a group
   */
  addParticipant: (
    groupId: string,
    contacts: string | string[]
  ) => Promise<InterfaceScope>;

  /**
   * Set the group description
   */
  setGroupDescription: (
    groupId: string,
    description: string
  ) => Promise<InterfaceScope>;

  /**
   * Set the group image
   */
  setGroupImage: (path: object, to: string) => Promise<InterfaceScope>;

  // Host e números
  /**
   * Get information about the connected number
   */
  getHost: () => Promise<InterfaceHost>;

  /**
   * Check if a number exists
   */
  checkNumberStatus: (number: string) => Promise<checkNumber>;

  // Versão e reações
  /**
   * Get the current WhatsApp version
   */
  getWAVersion: () => Promise<string>;

  /**
   * Serialize reactions
   */
  serializeReactions: (
    emoji: object,
    collections: object,
    type: object
  ) => Promise<object[]>;

  /**
   * Serialize intro reactions
   */
  serializeIntroReactions: (
    emoji: object,
    type: object
  ) => Promise<ReactionIntro | []>;
}

// Declaração global organizada
declare global {
  interface Window {
    API: API;
    Store: any;
    newOnAck: any;
    newMessage: any;
    newEditMessage: any;
    interfaceChange: any;
    newDeleteMessage: any;
    serializeMessageObj: any;
    onIntroReactionMessage: any;
    onReactionMessage: any;
    __debug: any;
  }

  const API: API;
}

export {};
