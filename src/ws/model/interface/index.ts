export interface options {
  /**
   * @default '8080'
   */
  port: string;
  /**
   * @default 'null'
   */
  url?: string;
}

export const defaultConfigWs: options = {
  port: '8080',
  url: '',
};
