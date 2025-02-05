export const eventInterfaceChange = async () => {
  const getData = () => ({
    displayInfo: window.Store.Stream.displayInfo,
    mode: window.Store.Stream.mode,
    info: window.Store.Stream.info,
  });
  const triggerChange = () => {
    if (typeof window.interfaceChange === 'function') {
      window.interfaceChange(getData());
    }
  };
  window.Store.Stream.on(
    'change:info change:displayInfo change:mode',
    triggerChange
  );
  triggerChange();
};
