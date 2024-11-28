interface Id {
  id: string;
  fromMe: boolean;
}

interface Remote {
  server: string;
  user: string;
  _serialized: string;
}

export interface IdMessage {
  id: Id;
  remote: Remote;
  _serialized: string;
}
