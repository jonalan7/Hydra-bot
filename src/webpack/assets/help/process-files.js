export async function processFiles(chat, blobs) {
    if (!Array.isArray(blobs)) {
        blobs = [blobs];
    }

    const mediaCollection = new Store.MediaCollection({
        chatParticipantCount: chat.getParticipantCount(),
    });

    await mediaCollection.processAttachments(
        blobs.map((blob) => {
          return {
            file: blob,
            filename: blob.name,
            mimetype: blob.type,
          };
        }),
        true,
        chat
      );

    return mediaCollection;
}