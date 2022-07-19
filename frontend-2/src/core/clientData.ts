import { LoginDetails } from "./types";
import { combineUrl } from "./helpers";

const API_URL_KEY = 'api_url';
const API_KEY_KEY = 'api_key';

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
 * gets either the configured api url (set when react build is run) or the guessed url (origin + /api)
 * @returns the absolute api url
 */
export function getApiUrl(): string {
  return window.localStorage.getItem(API_URL_KEY) || (new URL("/api", window.location.origin)).toString();
}

function getUpdateUrl(base_url: string, list_id: number | null): string {
  switch (list_id) {
    case null:
      return combineUrl("/updates/lists", base_url);
    default:
      return combineUrl(`/updates/lists/${list_id}`, base_url);
  }
}

export function getSSEUrl(login_details: LoginDetails, list_id: number | null): string {
  var url = getUpdateUrl(login_details.api_url, list_id);
  return url + `?api-key=${login_details.api_key}`;
}
