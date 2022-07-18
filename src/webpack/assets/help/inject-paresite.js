import {
    injectConfig,
    filterObjects
} from "./index";
export const injectParasiteSnake = async () => {
    window[injectConfig.webpack].push([
        [injectConfig.parasite],
        {},
        async function (e) {
            const modules = []; // modules whatsapp array
            Object.keys(e.m).forEach(function (mod) {
                modules[mod] = e(mod);
            });

            let found = 0;
            for (let i in modules) {
                if (typeof modules[i] === 'object' && modules[i] !== null) {
                    filterObjects.forEach((needObj) => {
                        if (!needObj.when | needObj.yesModule) return;

                        const checkObj = needObj.when(modules[i]);
                        if (checkObj !== null) {
                            found++;
                            needObj.yesModule = checkObj;
                        }
                    });
                    if (found == filterObjects.length) {
                        break;
                    }
                }
            }

            filterObjects.forEach((needObj) => {
                if (needObj.yesModule) {
                    if (needObj.type !== "Module") {
                        window.Store[needObj.type] = needObj.yesModule;
                    }
                }
            });

            const module = (filterObjects.filter((e) => e.type === "Module"))[0].yesModule;
            Object.keys(module).forEach((key) => {
                if (!['Chat'].includes(key)) {
                    if (window.Store[key]) {
                        window.Store[key + '_'] = module[key];
                    } else {
                        window.Store[key] = module[key];
                    }
                }
            });

        }
    ]);
}