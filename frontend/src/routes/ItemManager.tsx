import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ListItemTable from "../components/ListItemTable";
import { LoginContext } from "../contexts/LoginProvider";
import { deleteListItemById, getListById, getListItemsByList } from "../core/api";
import { ItemList, ListItem } from "../core/types";

function ItemManager() {
  const navigate = useNavigate();
  const { list_id } = useParams();
  const { login } = useContext(LoginContext);
  const [list, setList] = useState<ItemList>();
  const [list_items, setListItems] = useState<ListItem[]>([]);

  const update_content = async () => {
    // TODO: add more error handling
    if (login !== null) {
      setList(await getListById(login, Number(list_id)));
      setListItems(await getListItemsByList(login, Number(list_id)));
    }
    else {
      { navigate("/login"); }
    }
  };

  useEffect(() => { update_content() }, []);

  const itemRowDelete = async (item_id: number) => {
    let found_index = list_items.findIndex(row => row.id === item_id);
    if (found_index !== -1 && login && list) {
      await deleteListItemById(login, list.id, item_id);
      let new_list = list_items.filter((_, i) => i !== found_index);
      setListItems(new_list);
    }
  };

  return (
    <div>
      <h1>Items</h1>
      <h2>{list?.title}</h2>
      <p>{list?.description}</p>
      <Link to={`/lists/${list_id}/new-item`}>New Item</Link>
      <ListItemTable list_items={list_items} onDeleteRowClick={itemRowDelete} />
    </div>
  );
}

export default ItemManager;
