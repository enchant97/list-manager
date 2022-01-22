import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginProvider";
import { getListById, getListItemsByList } from "../core/api";
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

  return (
    <div>
      <h1>Items</h1>
      <h2>{list?.title}</h2>
      <ul>
        {list_items.map((row) => <li key={row.id}>{row.title}</li>)}
      </ul>
    </div>
  );
}

export default ItemManager;
