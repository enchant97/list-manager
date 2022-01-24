import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginProvider";
import { ItemList } from "../core/types";
import { deleteListById, getLists } from "../core/api";
import ListTable from "../components/ListTable";
import styles from "../styles/Core.module.css";

function ListManager() {
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const [item_lists, setItemLists] = useState<ItemList[]>([]);

  const update_lists = useCallback(async () => {
    // TODO: add more error handling
    if (login !== null) { setItemLists(await getLists(login)); }
    else { navigate("/login") }
  }, [login, setItemLists, navigate]);
  const handleListRowClick = (list_id: number) => navigate(`/lists/${list_id}`);
  const handleListRowDeleteClick = async (list_id: number) => {
    let found_index = item_lists.findIndex(row => row.id === list_id);
    if (found_index !== -1 && login && list_id) {
      await deleteListById(login, list_id);
      let new_lists = item_lists.filter((_, i) => i !== found_index);
      setItemLists(new_lists);
    }
  };

  useEffect(() => { update_lists() }, [update_lists]);

  return (
    <div className={styles.container}>
      <h1>Lists</h1>
      <Link className={styles.button} to={"/lists/new"}>New List</Link>
      {item_lists.length === 0
        ? <p>No lists found yet...</p>
        : <ListTable
          item_lists={item_lists} onListRowClick={handleListRowClick}
          onListRowDeleteClick={handleListRowDeleteClick}
        />
      }
    </div>
  );
}

export default ListManager;
