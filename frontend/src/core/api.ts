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

export async function getListById(login_details: LoginDetails, list_id: number): Promise<ItemList> {
  const url = new URL(`/lists/${list_id}`, login_details.api_url);
  const response = await fetch(url.toString(), {
    headers: createHeaders(login_details.api_key),
  });
  const json: ItemList = await response.json();
  return json;
}

export async function getListItemsByList(login_details: LoginDetails, list_id: number): Promise<ListItem[]> {
  const url = new URL(`/lists/${list_id}/items`, login_details.api_url);
  const response = await fetch(url.toString(), {
    headers: createHeaders(login_details.api_key),
  });
  const json: ListItem[] = await response.json();
  return json;
}

export async function getListItemById(login_details: LoginDetails, list_id: number, item_id: number): Promise<ListItem> {
  const url = new URL(`/lists/${list_id}/items/${item_id}`, login_details.api_url);
  const response = await fetch(url.toString(), {
    headers: createHeaders(login_details.api_key),
  });
  const json: ListItem = await response.json();
  return json;
}

export async function deleteListItemById(login_details: LoginDetails, list_id: number, item_id: number) {
  const url = new URL(`/lists/${list_id}/items/${item_id}`, login_details.api_url);
  await fetch(url.toString(), {
    method: "DELETE",
    headers: createHeaders(login_details.api_key),
  });
}
