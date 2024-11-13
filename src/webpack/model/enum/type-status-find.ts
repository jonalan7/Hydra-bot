export enum TypeStatusFind {
  /**
   * Starting browser
   */
  initBrowser = 'initBrowser',
  /**
   * Opening whatsapp page
   */
  initWhatsapp = 'initWhatsapp',
  /**
   * Website accessed successfully
   */
  openedWhatsapp = 'openedWhatsapp',
  /**
   * The browser has closed
   */
  browserClosed = 'browserClosed',
  /**
   * Error open whatzapp
   */
  noOpenWhatzapp = 'noOpenWhatzapp',
  /**
   * Error open browser
   */
  noOpenBrowser = 'noOpenBrowser',
  /**
   * Auto close called!
   */
  autoClose = 'autoClose',
  /**
   * Process chromium download
   */
  chromium = 'chromium',
}
