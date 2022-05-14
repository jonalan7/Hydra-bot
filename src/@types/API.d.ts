interface API {
  sendMessage: (to: string, body: String, options: object) => Promise<any>;
}

declare global {
  interface Window {
    API: API;
    Store: any;
  }
  const API: API;
}

export {};

