/**
 * Function to logout the user from the session
 */
export const logoutSession = () => {
  try {
    Store.Cmd.onStartingLogout();
    Store.Comms.stopComms();
    Store.SocketModel.Socket.clearCredentialsAndStoredData();
    Store.Cmd.logout();
  } catch (error) {
    throw error;
  }
};
