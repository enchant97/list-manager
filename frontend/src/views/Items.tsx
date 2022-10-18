import { Link, useNavigate, useParams } from "@solidjs/router";
import { Component, createEffect, createResource, createSignal, onCleanup, Show } from "solid-js";
import ItemsTable from "../components/ItemsTable";
import Loading from "../components/Loading";
import { useLogin } from "../contexts/LoginProvider";
import { deleteListItemById, getListById, getListItemsByList } from "../core/api";
import { getSSEUrl } from "../core/clientData";
import { liveUpdatesConnect } from "../core/helpers";
import { ListItem, UpdateMessage, UpdateMessageType } from "../core/types";

const Items: Component = () => {
  const navigate = useNavigate();
  const { list_id } = useParams();
  const [login] = useLogin();
  const [listItems, setListItems] = createSignal<ListItem[]>([]);
  const [list, { refetch: refetchList }] = createResource({ login, list_id }, async (params) => {
    let currLogin = params.login();
    if (!currLogin) return;
    return await getListById(currLogin, Number(params.list_id));
  });
  const [listItemsData, { refetch: refetchListItems }] = createResource({ login, list_id }, async (params) => {
    let currLogin = params.login();
    if (!currLogin) return;
    return await getListItemsByList(currLogin, Number(params.list_id));
  });

  createEffect(() => { if (!login()) { navigate("/login"); } });

  createEffect(() => {
    let new_items = listItemsData();
    if (new_items !== undefined) {
      setListItems(new_items);
    }
  });

  createEffect(() => {
    let currLogin = login();
    if (!currLogin) { return; }

    let sse_url = getSSEUrl(currLogin, null);
    let sse_close = liveUpdatesConnect(sse_url, (message: UpdateMessage) => {
      // don't need to update this page when there is a item change
      if (message.item_id === null) {
        if (message.list_id === Number(list_id)) {
          switch (message.update_type) {
            case UpdateMessageType.UPDATE:
              refetchList();
              break;
            case UpdateMessageType.REMOVE:
              navigate("/lists");
              break;
          }
        }
      }
      else {
        refetchList();
        refetchListItems();
      }
    });
    onCleanup(sse_close);
  });

  const handleItemDelete = async (item_id: number) => {
    let found_index = listItems().findIndex(row => row.id === item_id);
    let currLogin = login();
    if (found_index !== -1 && currLogin) {
      await deleteListItemById(currLogin, Number(list_id), item_id);
      let new_list = listItems().filter((_, i) => i !== found_index);
      setListItems(new_list);
    }
  };

  return (
    <div class="md:container md:mx-auto px-2">
      {/* TODO Replace this with a loading text box component */}
      <Show when={!list.loading} fallback={<><h1>...</h1><p>...</p></>}>
        <>
          <h1 class="text-3xl mb-3">{list()?.title}</h1>
          <p class="text-lg">{list()?.description}</p>
        </>
      </Show>
      <Link class="btn btn-outline my-3" href={`/lists/${list_id}/new`}>New Item</Link>
      <Show when={!listItemsData.loading} fallback={<Loading />}>
        <Show when={listItems().length !== 0} fallback={<p>No items found yet...</p>}>
          <ItemsTable list_items={listItems()} onDeleteRowClick={handleItemDelete} />
        </Show>
      </Show>
    </div>
  );
}

export default Items;
