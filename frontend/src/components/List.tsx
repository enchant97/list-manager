import { Link } from "react-router-dom";
import { ItemList } from "../core/types";

export type ListProps = {
  item_list: ItemList;
}

function List(props: ListProps) {
  return (
    <div>
      <h2>{props.item_list.title}</h2>
      <p>{props.item_list.description}</p>
      <div>
        <Link to={"/lists/" + props.item_list.id}>View Items</Link>
      </div>
    </div>
  );
}

export default List;
