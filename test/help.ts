import path from 'path';

// Path file example
export const pathFile = (folder: string, file: string) => {
  const pathSession = path.join(
    path.resolve(process.cwd(), 'test', folder, file)
  );
  return pathSession;
};

// Parameters for testing only
export const hydraBotTestFunctions = {
  // Send
  sendText: false,
  sendImage: false,

  // Events
  newOnAck: false,
  dowloadFiles: false,
  interfaceChange: false,
  qrcode: false,
  newMessage: false,
  newEditMessage: true,
  newDeleteMessage: true,
  onReactionMessage: true,
  onIntroReactionMessage: true,
};
