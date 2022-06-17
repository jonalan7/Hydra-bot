export enum onMode {
  /**
   * receive which interface the user is on!
   */
  interfaceChange = 'interfaceChange',
  /**
   * monitor new messages
   */
  newMessage = 'newMessage',
  /**
   * receive QRCODE updates
   */
  qrcode = 'qrcode',
  /**
   * user connection information
   */
  connection = 'connection',
  /**
   * monitor the status of a message
   */
  newOnAck = 'newOnAck',
}
