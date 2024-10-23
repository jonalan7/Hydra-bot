import { injectParasite } from './help/inject-paresite';
/**
 * Wait for modules
 */
const waitForObjects = async () => {
    return new Promise((resolve) => {
        let timeoutId;
        const checkObjects = () => {
            const canvasQrcode = document.querySelectorAll('canvas').length;
            const chat = document.querySelectorAll('#app .two').length;
            const FB = window['__d'];

            if ((canvasQrcode && FB) || (chat && FB)) {
                clearTimeout(timeoutId);
                return resolve({ fb: true });
            } else {
                timeoutId = setTimeout(checkObjects, 200);
            }
        };
        checkObjects();
    });
}

/**
 * Inject parasite
 */
export const initParasite = async () =>  {
    window.Store = {};
    const store = window.Store && Object.keys(window.Store).length === 0 ? false : true;
    if (!store) {
        const { fb } = await waitForObjects();
        if (fb) {
            injectParasite();
        }
    }
}
