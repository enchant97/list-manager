import { Link, useNavigate, useParams } from "solid-app-router";
import { Component, createEffect, createResource, createSignal, onCleanup, useContext } from "solid-js";
import ItemsTable from "../components/ItemsTable";
import Loading from "../components/Loading";
import { LoginContext } from "../contexts/LoginProvider";
import { deleteListItemById, getListById, getListItemsByList } from "../core/api";
import { getSSEUrl } from "../core/clientData";
import { liveUpdatesConnect } from "../core/helpers";
import { ListItem, UpdateMessage, UpdateMessageType } from "../core/types";
import shared_styles from "../Shared.module.css";

const Items: Component = () => {
  const navigate = useNavigate();
  const { list_id } = useParams();
  const { isLoggedIn, getLogin } = useContext(LoginContext);
  const [listItems, setListItems] = createSignal<ListItem[]>([]);
  const [list, { refetch: refetchList }] = createResource({ getLogin, list_id }, async (params) => {
    return await getListById(params.getLogin(), Number(params.list_id));
  });
  const [listItemsData, { refetch: refetchListItems }] = createResource({ getLogin, list_id }, async (params) => {
    return await getListItemsByList(params.getLogin(), Number(params.list_id));
  });

  createEffect(() => {
    if (isLoggedIn() === false) {
      navigate("/login");
    }
  });

  createEffect(() => {
    let new_items = listItemsData();
    if (new_items !== undefined) {
      setListItems(new_items);
    }
  });

  createEffect(() => {
    let sse_url = getSSEUrl(getLogin(), null);
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
    if (found_index !== -1 && isLoggedIn()) {
      await deleteListItemById(getLogin(), Number(list_id), item_id);
      let new_list = listItems().filter((_, i) => i !== found_index);
      setListItems(new_list);
    }
  };

  return (
    <div class={shared_styles.container}>
      <h1>Items</h1>
      {list.loading
        // Replace this with a loading text box component
        ? <><h2>...</h2><p>...</p></>
        : <>
          <h2>{list()?.title}</h2>
          <p>{list()?.description}</p>
        </>
      }
      <Link class={shared_styles.button} href={`/lists/${list_id}/new`}>New Item</Link>
      {listItemsData.loading
        ? <Loading />
        : <>
          {!listItems()
            ? <p>No items found yet...</p>
            : <ItemsTable list_items={listItems()} onDeleteRowClick={handleItemDelete} />
          }</>
      }
    </div>
  );
}

export default Items;
