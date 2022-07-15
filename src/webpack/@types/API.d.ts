interface API {
  sendMessage: (to: string, body: String, options: object) => Promise<any>;
  interfaceChange: (callback: Function) => void;
  newMessage: (callback: Function) => void;
  newOnAck: (callback: Function) => void; 
  getAllContacts: () => void;
  addChatWapi: () => void;
  createGroup: (groupName: string, contacts: string | string[]) => Promise<any>;
}

declare global {
  interface Window {
    API: API;
    Store: any;
    interfaceChange: any;
    newMessage: any;
    newOnAck: any;
  }
  const API: API;
}

export {};

