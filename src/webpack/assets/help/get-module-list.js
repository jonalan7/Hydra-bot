export const getModuleList = async () => {
  return new Promise((resolve) => {
    let modules = {};
    if (!window?.__debug?.modulesMap) {
      try {
        const debug = require.resolve('__debug');
        if (debug) {
          window['__debug'] = require('__debug');
        } else {
          throw new Error('__debug not found');
        }
      } catch {
        return getModuleList();
      }
    }

    Object.keys(window.__debug.modulesMap)
      .filter((e) => e.includes('WA'))
      .forEach(function (mod) {
        let module = window.__debug.modulesMap[mod];
        if (module) {
          modules[mod] = {
            default: module.defaultExport,
            factory: module.factory,
          };
          if (Object.keys(modules[mod].default).length === 0) {
            try {
              self.ErrorGuard.skipGuardGlobal(true);
              Object.assign(modules[mod], self.importNamespace(mod));
            } catch {}
          }
        }
      });
    resolve(modules);
  });
};
