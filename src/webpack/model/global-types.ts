import { API } from './api-types';

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
    importNamespace: any;
    eventOnLogout: any;
    __debug: any;
  }

  const API: API;
}

export const isNodeEnvironment = typeof window === 'undefined';
