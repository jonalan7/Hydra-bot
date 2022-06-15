export function AddOnAck() {
    let isHeroEqual = {};
    window.API.newOnAck = function (callback) {
        window.Store.Msg.on('change:ack', (newOnAck) => {
            if (!Object.is(isHeroEqual, newOnAck)) {
                isHeroEqual = newOnAck;
                if (newOnAck) {
                    callback(newOnAck);
                }
            }
        });
        
        return true;
    };
}