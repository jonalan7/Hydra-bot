export interface puppeteerOptions {
    headless?: boolean;
    args?: string[];
    executablePath?: string;
  }
  
export interface CreateOptions {
    session?: string;
    puppeteerOptions?: puppeteerOptions;
  }