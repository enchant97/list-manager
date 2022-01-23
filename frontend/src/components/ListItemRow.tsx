import { ListItem } from "../core/types";

export type ListItemRowProps = {
  item: ListItem;
  onDeleteClick: Function;
}

function ListItemRow(props: ListItemRowProps) {
  return (
    <tr>
      <td>{props.item.title}</td>
      <td><button onClick={() => {props.onDeleteClick(props.item.id)}}>Delete</button></td>
    </tr>
  );
}

export default ListItemRow;
