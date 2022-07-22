export interface InterfaceScope {
  to: to | string;
  erro: boolean;
  text: string;
  status: string;
  type: string;
  body: string;
}

interface remote {
  server: string;
  user: string;
  _serialized: string;
}

interface to {
  fromMe: boolean;
  remote: remote;
  id: string;
  _serialized: string;
}
