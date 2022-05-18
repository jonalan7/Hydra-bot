interface API {
  sendMessage: (to: string, body: String, options: object) => Promise<any>;
  interfaceChange: (callback: Function) => void;
}

declare global {
  interface Window {
    API: API;
    Store: any;
    interfaceChange: any;
  }
  const API: API;
}

export {};

