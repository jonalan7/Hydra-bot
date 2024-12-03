import { ScopeMsgErros } from '../model/interface';
/**
 * Function to extract error messages
 * @param error - message error
 * @returns error message
 */
const extractErrorMessage = (error: Error): string => {
  const regex = /^Error: (.+)$/;
  const match = error.message.match(regex);
  return match ? match[1] : error.message;
};

/**
 * Function to include error messages in the response
 * @param error - message error
 * @param to - chat id
 * @param function_name - function name
 * @returns
 */
export const includesMsgErros = (
  error: Error,
  to: string | undefined,
  function_name: string
): ScopeMsgErros => {
  const message = extractErrorMessage(error);
  return {
    message,
    to,
    function_name,
    error: true,
  };
};
