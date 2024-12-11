import { Page, Browser } from 'puppeteer';
import { CreateOptions } from '../../model/interface/';
import { includesMsgErros } from '../../help/includes-msg-erros';
import { FunctionsLayer, FunctionParameters } from '../../model/enum';

export class HelperLayer {
  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {}

  /**
   * Function to handle API calls with error handling
   * @param functionName - Function name to be called in the API object
   * @param args - Function parameters to be passed to the function
   * @returns - Returns the result of the function call
   */
  public async handleApiCallParametres<K extends FunctionsLayer>(
    functionName: K,
    ...args: FunctionParameters[K]
  ): Promise<any> {
    const [...params] = args;
    try {
      const result = await this.page.evaluate(
        async (fn: string, params: any[]) => {
          try {
            return await API[fn](...params);
          } catch (error: any) {
            return { ...error };
          }
        },
        functionName,
        params
      );

      if (result && (result as any).error) {
        throw result;
      }

      return result;
    } catch (error: any) {
      throw error;
    }
  }
}
