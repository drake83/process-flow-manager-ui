import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { host } from './host';
import { getCookieValue } from './jwt-cookie';

export class ResponseError extends Error {
  public response: AxiosResponse;

  constructor(response: AxiosResponse) {
    super(response.statusText);
    this.response = response;
  }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: AxiosResponse) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: AxiosResponse) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

const buildHeaders = (withAuth: boolean) => {
  const defaultHeaders: AxiosRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (withAuth) {
    const jwt_token = getCookieValue();
    return { ...defaultHeaders, Authorization: `Bearer ${jwt_token}` };
  }

  return defaultHeaders;
};

interface Request extends AxiosRequestConfig {
  withAuth?: boolean;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(
  url: string,
  options?: Request,
): Promise<{} | { err: ResponseError }> {
  const fetchResponse = await axios({
    baseURL: host,
    url,
    method: options?.method || 'get',
    headers: buildHeaders(options?.withAuth || false),
  });
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}
