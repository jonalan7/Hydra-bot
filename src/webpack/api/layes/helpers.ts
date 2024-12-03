import { Page, Browser } from 'puppeteer';
import { CreateOptions } from '../../model/interface/';
import { includesMsgErros } from '../../help/includes-msg-erros';

export class HelperLayer {
  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {}

  /**
   * Wrapper to handle API calls with error handling
   * @param evaluateFn Function to evaluate in the page context
   * @param methodName Name of the method for error tracking
   * @returns The evaluated result
   */
  public async handleApiCall<T>(
    evaluateFn: () => Promise<T>,
    methodName: string
  ): Promise<T> {
    try {
      const result = await this.page.evaluate(evaluateFn);
      if (result && (result as any).error) {
        throw result;
      }
      return result;
    } catch (error: any) {
      const checkError = includesMsgErros(error, undefined, methodName);
      if (checkError.error) {
        throw checkError;
      }
      throw error;
    }
  }
}
