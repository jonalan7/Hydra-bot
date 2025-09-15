export async function processFiles(chat, blobs) {
  if (!Array.isArray(blobs)) {
    blobs = [blobs];
  }

  const mediaCollection = new Store.MediaCollection({
    chatParticipantCount: chat.getParticipantCount(),
  });

  const allMsgTypes = Store.MediaTypes.getSupportedMediaTypesForChat(chat);

  await mediaCollection.processAttachments(
    blobs.map((blob) => {
      return {
        file: blob,
        filename: blob.name,
        mimetype: blob.type,
        type: Store.MimeTypes.MIMETYPES[blob.type].msgType,
      };
    }),
    1,
    allMsgTypes,
    100
  );

  return mediaCollection;
}
