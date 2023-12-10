/**
 * Simple wrapper around fetch API tailored for CEF/NUI use.
 * @param eventName - The endpoint eventname to target
 * @param data - Data you wish to send in the NUI Callback
 *
 * @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
 */
import { LogDebugEvent } from './debug';

export const isEnvBrowser = (): boolean =>
  process.env.NODE_ENV === 'development' && !(window as any).invokeNative;

export interface ServerPromiseResp<T = undefined> {
  errorMsg?: string;
  status: 'ok' | 'error';
  data?: T;
}

export const buildRespObj = <T = unknown>(
  data: any,
  status: 'ok' | 'error',
  errorMsg?: string,
): ServerPromiseResp<T> => ({
  data,
  status,
  errorMsg,
});

async function fetchNui<T = any, D = any>(
  eventName: string,
  data?: D,
  mockResp?: T,
): Promise<ServerPromiseResp<T>> {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };

  if (isEnvBrowser() && mockResp) {
    LogDebugEvent({
      data: {
        request: data,
        response: mockResp,
      },
      action: `fetchNui (${eventName})`,
    });
    return buildRespObj<T>(mockResp, 'ok');
  }

  const resourceName = (window as any).GetParentResourceName
    ? (window as any).GetParentResourceName()
<<<<<<< HEAD
    : 'npwd';
=======
    : 'mdt';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);

  const responseObj = await resp.json();

  LogDebugEvent({
    data: {
      request: data,
      response: responseObj,
    },
    action: `fetchNui (${eventName})`,
  });

  return responseObj;
}

export default fetchNui;
