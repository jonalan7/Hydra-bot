import { Page, Browser } from 'puppeteer';
import { CreateOptions } from '../../model/interface/';
import { FunctionsLayer, FunctionParameters } from '../../model/enum';

export class HelperLayer {
  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {}

  public async handleApiCallPage<K extends FunctionsLayer>(
    functionName: K,
    ...args: FunctionParameters[K]
  ): Promise<any> {
    try {
      const page = this.page as unknown as Page;
      const result = await (
        page[functionName as unknown as keyof Page] as Function
      )(...args);

      if (result && (result as any).error) {
        throw result;
      }

      return result;
    } catch (error: any) {
      throw error;
    }
  }
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
