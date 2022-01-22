const API_URL_KEY = 'api_url';
const API_KEY_KEY = 'api_key';

export type LoginDetails = {
  api_url: string;
  api_key: string;
}

export function getLoginDetails(): LoginDetails | null {
  let api_url = window.localStorage.getItem(API_URL_KEY);
  let api_key = window.localStorage.getItem(API_KEY_KEY);

  if (api_url === null || api_key === null) {
    return null;
  }
  return { api_url, api_key };
}

export function setLoginDetails(details: LoginDetails) {
  window.localStorage.setItem(API_URL_KEY, details.api_url);
  window.localStorage.setItem(API_KEY_KEY, details.api_key);
}

export function removeLoginDetails() {
  window.localStorage.removeItem(API_URL_KEY);
  window.localStorage.removeItem(API_KEY_KEY);
}

/**
 * gets either the configured api url or the guessed url (origin + /api)
 * @returns the absolute api url
 */
export function getApiUrl(): string {
  return window.localStorage.getItem(API_URL_KEY) || window.location.origin + '/api';
}
