import { Link, useNavigate } from "@solidjs/router";
import { Component, createEffect, createResource, createSignal, onCleanup } from "solid-js";
import ListTable from "../components/ListTable";
import Loading from "../components/Loading";
import { useLogin } from "../contexts/LoginProvider";
import { deleteListById, getLists } from "../core/api";
import { getSSEUrl } from "../core/clientData";
import { liveUpdatesConnect } from "../core/helpers";
import { ItemList, UpdateMessage } from "../core/types";
import shared_styles from "../Shared.module.css";

const Lists: Component = () => {
  const navigate = useNavigate();
  const [login] = useLogin();
  const [getItemLists, setItemLists] = createSignal<ItemList[]>([]);
  const [listData, { refetch }] = createResource(login, getLists);

  createEffect(() => { if (!login()) { navigate("/login"); } });

  createEffect(() => {
    let currLogin = login();
    if (!currLogin) { return; }

    let sse_url = getSSEUrl(currLogin, null);
    let sse_close = liveUpdatesConnect(sse_url, (message: UpdateMessage) => {
      // don't need to update this page when there is a item change
      if (message.item_id !== null) return;
      refetch();
    });
    onCleanup(sse_close);
  });

  createEffect(() => {
    let new_lists = listData();
    if (new_lists) {
      setItemLists(new_lists);
    }
  });

  const handleListRowClick = (list_id: number) => navigate(`/lists/${list_id}`);
  const handleListRowDeleteClick = async (list_id: number) => {
    let currLogin = login();
    let itemLists = getItemLists();
    let found_index = itemLists.findIndex(row => row.id === list_id);
    if (found_index !== -1 && currLogin && list_id) {
      await deleteListById(currLogin, list_id);
      let new_lists = itemLists.filter((_, i) => i !== found_index);
      setItemLists(new_lists);
    }
  };

  return (
    <div class={shared_styles.container}>
      <h1>Lists</h1>
      <Link class={shared_styles.button} href={"/lists/new"}>New List</Link>
      {listData.loading
        ? <Loading />
        : <>
          {getItemLists().length === 0
            ? <p>No lists found yet...</p>
            : <ListTable
              item_lists={getItemLists()} onListRowClick={handleListRowClick}
              onListRowDeleteClick={handleListRowDeleteClick}
            />
          }</>
      }

    </div>
  );
};

export default Lists;
