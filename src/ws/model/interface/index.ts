export interface options {
  /**
   * Port to be used in the project
   * @default '8080'
   */
  port?: string;
  /**
   * URL to be used in the project
   * @default 'null'
   */
  url?: string;
  /**
   * Authentication to be used in the project
   * @default true
   */
  authentication?: boolean;
  /**
   * Token to be used in the project
   * @default 'null'
   */
  token?: string;
  /**
   * Session to be used in the project
   * @default 'null'
   */
  session?: string;
  /**
   * host server to be used in the project
   * @default 'http://localhost'
   */
  hostServer?: string;
}

export const defaultConfigWs: options = {
  port: '8080',
  url: '',
  authentication: true,
  hostServer: 'http://localhost',
};
