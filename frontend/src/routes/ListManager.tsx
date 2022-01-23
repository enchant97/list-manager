import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginProvider";
import { ItemList } from "../core/types";
import { deleteListById, getLists } from "../core/api";
import ListTable from "../components/ListTable";

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
  };
  const handleListRowClick = (list_id: number) => navigate(`/lists/${list_id}`);
  const handleListRowDeleteClick = async (list_id: number) => {
    let found_index = item_lists.findIndex(row => row.id === list_id);
    if (found_index !== -1 && login && list_id) {
      await deleteListById(login, list_id);
      let new_lists = item_lists.filter((_, i) => i !== found_index);
      setItemLists(new_lists);
    }
  };

  useEffect(() => { update_lists() }, []);

  return (
    <div>
      <h1>Lists</h1>
      <ListTable item_lists={item_lists} onListRowClick={handleListRowClick} onListRowDeleteClick={handleListRowDeleteClick}/>
    </div>
  );
}

export default ListManager;
