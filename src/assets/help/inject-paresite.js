import {
    injectConfig,
    filterObjects
} from "./index";
export const injectParasiteSnake = async () => {
    window[injectConfig.webpack].push([
        [injectConfig.parasite],
        {},
        async function (o) {
            const modules = []; // modules whatsapp array
            for (let idx in o.m) {
                modules.push(o(idx));
            }
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

            let neededStore = filterObjects.find((e) => e.type === 'Module');
            
            if (neededStore) {
                window.Store = filterObjects.yesModule ? filterObjects.yesModule : {};
            }

            filterObjects.splice(filterObjects.indexOf(neededStore), 1);

            filterObjects.forEach((needObj) => {
                if (needObj.yesModule) {  
                    window.Store[needObj.type] = needObj.yesModule;
                }
            });

            Object.keys(neededStore.yesModule).forEach((e) => { 
                window.Store[e] = neededStore.yesModule[e];
            })
            
            if (Store && Store.BusinessProfile) {
                Store.Chat._findAndParse = Store.BusinessProfile._findAndParse;
                Store.Chat._find = Store.BusinessProfile._find;
              }
        },
    ]);
}