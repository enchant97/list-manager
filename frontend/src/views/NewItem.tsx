import { useNavigate, useParams } from "@solidjs/router";
import { Component, createEffect, createSignal, onCleanup } from "solid-js";
import { useLogin } from "../contexts/LoginProvider";
import { newListItem } from "../core/api";
import { getSSEUrl } from "../core/clientData";
import { liveUpdatesConnect } from "../core/helpers";
import { UpdateMessage, UpdateMessageType } from "../core/types";
import shared_styles from "../Shared.module.css";

type NewItemSignal = {
  title: string;
}

const NewItem: Component = () => {
  const navigate = useNavigate();
  const { list_id } = useParams();
  const [login] = useLogin();
  const [getNewItem, setNewItem] = createSignal<NewItemSignal>({ title: "" });

  createEffect(() => { if (!login()) { navigate("/login"); } })

  createEffect(() => {
    let currLogin = login();
    if (!currLogin) { return; }

    let sse_url = getSSEUrl(currLogin, null);
    let sse_close = liveUpdatesConnect(sse_url, (message: UpdateMessage) => {
      if (message.item_id === null && message.list_id === Number(list_id) && message.update_type === UpdateMessageType.REMOVE) {
        // the list we are adding an item to no longer exists
        navigate("/lists");
      }
    });
    onCleanup(sse_close);
  });

  const handleTitleChange = (event: any) => {
    setNewItem({ title: event.target.value });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let currLogin = login();
    if (currLogin) {
      await newListItem(currLogin, Number(list_id), getNewItem());
      navigate(`/lists/${list_id}`);
    }
  };

  return (
    <form class={shared_styles.twoCol} onSubmit={handleSubmit}>
      <h1 class={shared_styles.fillBoth}>New Item</h1>
      <label for="new-item-title">Title</label>
      <input
        type="text" name="new-item-title" id="new-item-title"
        value={getNewItem().title} onChange={handleTitleChange} maxLength={80} autofocus required
      />
      <button class={shared_styles.fillBoth} type="submit">Create</button>
      <button class={shared_styles.fillBoth} type="button" onClick={() => navigate(-1)}>Go Back</button>
    </form>
  );
};

export default NewItem;
