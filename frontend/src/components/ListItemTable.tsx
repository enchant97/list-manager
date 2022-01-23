import { ListItem } from "../core/types";
import ListItemRow from "./ListItemRow";

export type ListItemTableProps = {
  list_items: ListItem[];
  onDeleteRowClick: Function;
}

function ListItemTable(props: ListItemTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.list_items.map((row) => <ListItemRow key={row.id} item={row} onDeleteClick={props.onDeleteRowClick} />)}
      </tbody>
    </table>
  );
}

export default ListItemTable;
