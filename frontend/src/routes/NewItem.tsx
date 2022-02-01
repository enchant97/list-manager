import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginProvider";
import { newListItem } from "../core/api";
import { getSSEUrl } from "../core/clientData";
import { liveUpdatesConnect } from "../core/helpers";
import { UpdateMessage, UpdateMessageType } from "../core/types";
import styles from "../styles/Core.module.css";

export type NewItemState = {
  title: string;
}

function NewItem() {
  const navigate = useNavigate();
  const { list_id } = useParams();
  const { login } = useContext(LoginContext);
  const [new_item, setNewItem] = useState<NewItemState>({ title: "" });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ title: event.target.value });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (login) {
      await newListItem(login, Number(list_id), new_item);
      navigate(`/lists/${list_id}`);
    }
  };

  useEffect(() => {
    if (login === null) {
      navigate("/login");
      return;
    }

    let sse_url = getSSEUrl(login, null);
    let sse_close = liveUpdatesConnect(sse_url, (message: UpdateMessage) => {
      if (message.item_id === null && message.list_id === Number(list_id) && message.update_type === UpdateMessageType.REMOVE) {
        // the list we are adding an item to no longer exists
        navigate("/lists");
      }
    });
    return sse_close;
  }, [login, navigate, list_id]);

  return (
    <form className={styles.twoCol} onSubmit={handleSubmit}>
      <h1 className={styles.fillBoth}>New Item</h1>
      <label htmlFor="new-item-title">Title</label>
      <input
        type="text" name="new-item-title" id="new-item-title"
        value={new_item.title} onChange={handleTitleChange} maxLength={80} autoFocus required
      />
      <button className={styles.fillBoth} type="submit">Create</button>
      <button className={styles.fillBoth} type="button" onClick={() => navigate(-1)}>Go Back</button>
    </form>
  );
}

export default NewItem;
