import { ItemList, ListItem, LoginDetails } from "./types";

function createHeaders(api_token: string) {
  return {
    'Content-Type': 'application/json',
    'X-API-Key': api_token,
  };
}

export async function getLists(login_details: LoginDetails): Promise<ItemList[]> {
  const url = new URL("/lists", login_details.api_url);
  const response = await fetch(url.toString(), {
    headers: createHeaders(login_details.api_key),
  });
  const json: ItemList[] = await response.json();
  return json;
}
