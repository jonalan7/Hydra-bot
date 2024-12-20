export enum OnModeListener {
  /**
   * receive which interface the user is on!
   */
  interfaceChange = 'interfaceChange',
  /**
   * monitor new messages
   */
  newMessage = 'newMessage',
  /**
   * monitor the status of a message
   */
  newOnAck = 'newOnAck',
  /**
   * Receive new messages edited
   */
  newEditMessage = 'newEditMessage',
  /**
   * Receive new messages deleted
   */
  newDeleteMessage = 'newDeleteMessage',
  /**
   * Receive new messagens reactions emoji
   */
  onReactionMessage = 'onReactionMessage',
  /**
   * Receive new message intro reactions emoji (It is triggered upon entering the chat, loading all available emojis. It is also triggered when a new emoji is sent in any chat)
   */
  onIntroReactionMessage = 'onIntroReactionMessage',
}

export enum OnMode {
  /**
   * receive QRCODE updates
   */
  qrcode = 'qrcode',
  /**
   * user connection information
   */
  connection = 'connection',
}
