import { puppeteerConfig } from '../../help';

export interface puppeteerOptions {
  /**
   * @default true
   */
  headless?: boolean;
  args?: string[];
  /**
   * @default null
   */
  executablePath?: string;
  /**
   * @default null
   */
  userDataDir?: string;
  /**
   * @default null
   */
  ignoreHTTPSErrors?: boolean;
}

export interface CreateOptions {
  /**
   * @default 'session'
   */
  session?: string;
  /**
   * @default 'token'
   */
  pathNameToken?: string;
  /**
   * @default null
   */
  mkdirFolderToken?: string;
  puppeteerOptions?: puppeteerOptions;
  /**
   * @default true
   */
  printQRInTerminal?: boolean;
   /**
   * @default 60000
   */
  timeAutoClose?: number;
}

export const defaultConfig: CreateOptions = {
  session: 'session',
  pathNameToken: 'token',
  mkdirFolderToken: '',
  puppeteerOptions: {
    headless: true,
    args: puppeteerConfig.chromiumArgs,
    executablePath: 'useChrome',
    ignoreHTTPSErrors: true,
    userDataDir: '',
  },
  printQRInTerminal: true,
  timeAutoClose: 60000
};
