import { filterObjects, filterModule, getModuleList } from './index';

export const injectParasite = async () => {
  const modules = await getModuleList();
  const filterMod = await filterModule(filterObjects, modules);
  filterMod.forEach((needObj) => {
    if (needObj.yesModule) {
      if (needObj.type !== 'Module') {
        if (!window.Store[needObj.type]) {
          window.Store[needObj.type] = needObj.yesModule;
        }
      }
    }
  });

  const module = filterMod.filter((e) => e.type === 'Module')[0].yesModule;
  Object.keys(module).forEach((key) => {
    if (!Store[key]) {
      Store[key] = module[key];
    }
  });
};
