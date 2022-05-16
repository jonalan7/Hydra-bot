import { puppeteerConfig } from '../../help';

export interface puppeteerOptions {
  /**
   * @default false
   */
  headless: boolean;
  args: string[];
  /**
   * @default null
   */
  executablePath: string;
  /**
   * @default null
   */
  userDataDir: string;
  /**
   * @default null
   */
  ignoreHTTPSErrors: boolean;
}

export interface CreateOptions {
  /**
   * @default 'Snake'
   */
  session: string;
  /**
   * @default 'token'
   */
  pathNameToken: string;
  /**
   * @default null
   */
  mkdirFolderToken: string;
  puppeteerOptions: puppeteerOptions;
}

export const defaultConfig: CreateOptions = {
  session: 'Snake',
  pathNameToken: 'token',
  mkdirFolderToken: '',
  puppeteerOptions: {
    headless: false,
    args: puppeteerConfig.chromiumArgs,
    executablePath: '',
    ignoreHTTPSErrors: true,
    userDataDir: ''
  },
};
