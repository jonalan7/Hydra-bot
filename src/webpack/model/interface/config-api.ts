import { puppeteerConfig } from '../../help';

export interface puppeteerOptions {
  /**
   * @default true
   */
  headless?: boolean;
  /**
   * @default true
   */
  downloadChromium?: boolean;
  /**
   * @default '818858'
   */
  chromiumVersion?: string;
  /**
   * @default null
   */
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
   * @default true
   */
  updatesLog?: boolean;
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
  updatesLog: true,
  pathNameToken: 'token',
  mkdirFolderToken: '',
  puppeteerOptions: {
    headless: true,
    args: puppeteerConfig.chromiumArgs,
    executablePath: 'useChrome',
    ignoreHTTPSErrors: true,
    userDataDir: '',
    downloadChromium: true,
    chromiumVersion: '818858'
  },

  printQRInTerminal: true,
  timeAutoClose: 60000,
};
