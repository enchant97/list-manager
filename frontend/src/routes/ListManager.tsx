import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginProvider";
import { ItemList } from "../core/types";
import { getLists } from "../core/api";
import List from "../components/List";

function ListManager() {
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const [item_lists, setItemLists] = useState<ItemList[]>([]);
  const update_lists = async () => {
    // TODO: add more error handling
    if (login !== null) { setItemLists(await getLists(login)); }
    else {
      { navigate("/login"); }
    }
  }
  useEffect(() => { update_lists() }, []);

  return (
    <div>
      <h1>Lists</h1>
      {item_lists.map((row, i) => <List key={row.id} item_list={row} />)}
    </div>
  );
}

export default ListManager;
