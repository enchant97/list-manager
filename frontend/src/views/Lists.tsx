import { Link, useNavigate } from "@solidjs/router";
import { Component, createEffect, createResource, createSignal, lazy, onCleanup, Show } from "solid-js";
import ListTable from "../components/ListTable";
import Loading from "../components/Loading";
import { useLogin } from "../contexts/LoginProvider";
import { useModal } from "../contexts/ModalProvider";
import { deleteListById, getLists } from "../core/api";
import { getSSEUrl } from "../core/clientData";
import { liveUpdatesConnect } from "../core/helpers";
import { ItemList, UpdateMessage } from "../core/types";
import NewList from "../modals/NewList";

const Lists: Component = () => {
  const navigate = useNavigate();
  const { setModal } = useModal();
  const [login] = useLogin();
  const [getItemLists, setItemLists] = createSignal<ItemList[]>([]);
  const [listData, { refetch }] = createResource(login, getLists);
  const modal = <NewList/>;
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
    <div class="md:container md:mx-auto px-2">
      <h1 class="text-3xl mb-3">Lists</h1>
      <button class="btn btn-outline mb-3" onclick={() => { setModal(modal) }}>New List</button>
      <Show when={!listData.loading} fallback={<Loading />}>
        <Show when={getItemLists().length !== 0} fallback={<p>No lists found yet...</p>}>
          <ListTable
            item_lists={getItemLists()}
            onListRowClick={handleListRowClick}
            onListRowDeleteClick={handleListRowDeleteClick}
          />
        </Show>
      </Show>
    </div>
  );
};

export default Lists;
