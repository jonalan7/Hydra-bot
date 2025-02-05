export const eventNewOnAck = async () => {
  window.Store.Msg.on('change:ack', (ackMessage) => {
    if (ackMessage) {
      if (typeof window.newOnAck === 'function') {
        window.newOnAck(ackMessage);
      }
    }
  });
};
