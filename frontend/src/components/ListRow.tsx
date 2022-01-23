import { ItemList } from "../core/types";

export type ListRowProps = {
  item_list: ItemList;
  onViewClick: Function;
  onDeleteClick: Function;
}

function ListRow(props: ListRowProps) {
  return (
    <tr>
      <td>{props.item_list.title}</td>
      <td><button onClick={() => props.onViewClick(props.item_list.id)}>View</button></td>
      <td><button onClick={() => props.onDeleteClick(props.item_list.id)}>Delete</button></td>
    </tr>
  );
}

export default ListRow;
