import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListItemRow from "../components/ListItemRow";
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list_items.map((row) => <ListItemRow key={row.id} item={row} onDeleteClick={itemRowDelete} />)}
        </tbody>
      </table>
    </div>
  );
}

export default ItemManager;
