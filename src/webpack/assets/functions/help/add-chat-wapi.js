function getChat(modules) {
  for (let idx in modules) {
    if (typeof modules[idx] === 'object' && modules[idx] !== null) {
      const module = modules[idx];
      const evet =
        module.default && module.default.Chat && module.default.Msg
          ? module.default.Chat
          : null;

      if (evet) {
        Store['Chat'] = evet;
        if (Store && Store.BusinessProfile) {
          Store.Chat._findAndParse = Store.BusinessProfile._findAndParse;
          Store.Chat._find = Store.BusinessProfile._find;
        }
      }
    }
  }
}

export async function addChatWapi() {
  const parasite = `chat${Date.now()}`;
  window['webpackChunkwhatsapp_web_client'].push([
    [parasite],
    {},
    function (o) {
      let modules = [];
      for (let idx in o.m) {
        modules.push(o(idx));
      }
      getChat(modules);
    },
  ]);
}
