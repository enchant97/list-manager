import { ItemList, ItemListCreate, ListItem, ListItemCreate, LoginDetails } from "./types";
import { combineUrl, throwRequestErrors } from "./helpers";

function createHeaders(api_token: string) {
  return {
    'Content-Type': 'application/json',
    'X-API-Key': api_token,
  };
}

export async function getVersion(login_details: LoginDetails): Promise<string> {
  const url = combineUrl("/version", login_details.api_url);
  const response = await fetch(url.toString(), {
    headers: createHeaders(login_details.api_key),
  });
  throwRequestErrors(response);
  return await response.json();
}

export async function getLists(login_details: LoginDetails): Promise<ItemList[]> {
  const url = combineUrl("/lists", login_details.api_url);
  const response = await fetch(url.toString(), {
    headers: createHeaders(login_details.api_key),
  });
  const json: ItemList[] = await response.json();
  return json;
}

export async function newList(login_details: LoginDetails, new_list: ItemListCreate): Promise<ItemList> {
  const url = combineUrl("/lists", login_details.api_url);
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: createHeaders(login_details.api_key),
    body: JSON.stringify(new_list),
  });
  const json: ItemList = await response.json();
  return json;
}

export async function getListById(login_details: LoginDetails, list_id: number): Promise<ItemList> {
  const url = combineUrl(`/lists/${list_id}`, login_details.api_url);
  const response = await fetch(url.toString(), {
    headers: createHeaders(login_details.api_key),
  });
  const json: ItemList = await response.json();
  return json;
}

export async function deleteListById(login_details: LoginDetails, list_id: number) {
  const url = combineUrl(`/lists/${list_id}`, login_details.api_url);
  await fetch(url.toString(), {
    method: "DELETE",
    headers: createHeaders(login_details.api_key),
  });
}

export async function getListItemsByList(login_details: LoginDetails, list_id: number): Promise<ListItem[]> {
  const url = combineUrl(`/lists/${list_id}/items`, login_details.api_url);
  const response = await fetch(url.toString(), {
    headers: createHeaders(login_details.api_key),
  });
  const json: ListItem[] = await response.json();
  return json;
}

export async function newListItem(login_details: LoginDetails, list_id: number, new_item: ListItemCreate) {
  const url = combineUrl(`/lists/${list_id}/items`, login_details.api_url);
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: createHeaders(login_details.api_key),
    body: JSON.stringify(new_item),
  });
  const json: ListItem = await response.json();
  return json;
}

export async function getListItemById(login_details: LoginDetails, list_id: number, item_id: number): Promise<ListItem> {
  const url = combineUrl(`/lists/${list_id}/items/${item_id}`, login_details.api_url);
  const response = await fetch(url.toString(), {
    headers: createHeaders(login_details.api_key),
  });
  const json: ListItem = await response.json();
  return json;
}

export async function deleteListItemById(login_details: LoginDetails, list_id: number, item_id: number) {
  const url = combineUrl(`/lists/${list_id}/items/${item_id}`, login_details.api_url);
  await fetch(url.toString(), {
    method: "DELETE",
    headers: createHeaders(login_details.api_key),
  });
}
