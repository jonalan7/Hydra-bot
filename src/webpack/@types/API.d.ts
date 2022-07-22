interface API {
  /**
   * Parameters to change group description
   */
  sendMessage: (to: string, body: String, options: object) => Promise<any>;
  /**
   * receive which interface the user is on!
   */
  interfaceChange: (callback: Function) => void;
  /**
   * monitor new messages
   */
  newMessage: (callback: Function) => void;
  /**
   * monitor the status of a message
   */
  newOnAck: (callback: Function) => void;
  /**
   * returns a list of contacts
   * @returns contacts
   */
  getAllContacts: () => void;
  /**
   * Add chat function
   */
  addChatWapi: () => void;
  /**
   * Creates a new chat group
   * @param groupName Group name
   * @param contacts Participants id '000000000000@c.us'
   */
  createGroup: (groupName: string, contacts: string | string[]) => Promise<any>;
  /**
   * Add participant to Group
   * @param groupId Chat id ('0000000000-00000000@g.us' or '000000000000000000@g.us')
   * @param contacts Participants id '000000000000@c.us'
   */
  addParticipant: (
    groupId: string,
    contacts: string | string[]
  ) => Promise<any>;
  /**
   * Parameters to change group description
   * @param {string} groupId group number
   * @param {string} description group description
   */
  setGroupDescription: (groupId: string, description: string) => Promise<any>;
  /**
   * Get information from the connected number
   * @returns Current host device details
   */
  getHost: () => Promise<any>;
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
