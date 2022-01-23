import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginProvider";
import { ItemList } from "../core/types";
import { getLists } from "../core/api";
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

  useEffect(() => { update_lists() }, []);

  return (
    <div>
      <h1>Lists</h1>
      <ListTable item_lists={item_lists} onListRowClick={handleListRowClick}/>
    </div>
  );
}

export default ListManager;
