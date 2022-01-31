import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ListItemTable from "../components/ListItemTable";
import { LoginContext } from "../contexts/LoginProvider";
import { deleteListItemById, getListById, getListItemsByList } from "../core/api";
import { getSSEUrl } from "../core/clientData";
import { liveUpdatesConnect } from "../core/helpers";
import { ItemList, ListItem, UpdateMessage, UpdateMessageType } from "../core/types";
import styles from "../styles/Core.module.css";

function ItemManager() {
  const navigate = useNavigate();
  const { list_id } = useParams();
  const { login } = useContext(LoginContext);
  const [list, setList] = useState<ItemList>();
  const [list_items, setListItems] = useState<ListItem[]>([]);

  const update_content = useCallback(async () => {
    // TODO: add more error handling
    if (login !== null) {
      setList(await getListById(login, Number(list_id)));
      setListItems(await getListItemsByList(login, Number(list_id)));
    }
    else { navigate("/login") }
  }, [navigate, list_id, login, setList, setListItems]);
  const update_list = useCallback(async () => {
    if (login === null) { navigate("/login"); return; }
    let updated_list = await getListById(login, Number(list_id));
    setList(updated_list);
  }, [setList, list_id, navigate, login]);

  useEffect(() => {
    if (login === null) {
      navigate("/login");
      return;
    }
    update_content();
    let sse_url = getSSEUrl(login, null);
    let sse_close = liveUpdatesConnect(sse_url, (message: UpdateMessage) => {
      // don't need to update this page when there is a item change
      if (message.item_id === null) {
        if (message.list_id === Number(list_id)) {
          switch (message.update_type) {
            case UpdateMessageType.UPDATE:
              update_list();
              break;
            case UpdateMessageType.REMOVE:
              navigate("/lists");
              break;
          }
        }
      }
      else {
        update_content();
      }
    });
    return sse_close;
  }, [update_content, login, navigate, list_id, update_list]);

  const itemRowDelete = async (item_id: number) => {
    let found_index = list_items.findIndex(row => row.id === item_id);
    if (found_index !== -1 && login && list) {
      await deleteListItemById(login, list.id, item_id);
      let new_list = list_items.filter((_, i) => i !== found_index);
      setListItems(new_list);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Items</h1>
      <h2>{list?.title}</h2>
      <p>{list?.description}</p>
      <Link className={styles.button} to={`/lists/${list_id}/new-item`}>New Item</Link>
      {list_items.length === 0
        ? <p>No items found yet...</p>
        : <ListItemTable list_items={list_items} onDeleteRowClick={itemRowDelete} />
      }
    </div>
  );
}

export default ItemManager;
