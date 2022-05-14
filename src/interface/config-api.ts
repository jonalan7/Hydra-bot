export interface puppeteerOptions {
    headless: boolean;
    args: string[];
  }
  
export interface CreateOptions {
    session?: string;
    puppeteerOptions?: puppeteerOptions;
  }