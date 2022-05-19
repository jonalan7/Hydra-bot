export function addOnNewMessage() {
    let isHeroEqual = {};
    window.API.newMessage = (callback) => {
        window.Store.Msg.on('add', (newMessage) => {
            if (!Object.is(isHeroEqual, newMessage)) {
                isHeroEqual = newMessage;
                if (newMessage && newMessage.isNewMsg) {
                    callback(API.serializeMessageObj(newMessage));
                }
            }
        });

        return true;
    };
}