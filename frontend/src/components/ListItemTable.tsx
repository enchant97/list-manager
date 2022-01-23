import { ListItem } from "../core/types";
import ListItemRow from "./ListItemRow";
import style from '../styles/Table.module.css'

export type ListItemTableProps = {
  list_items: ListItem[];
  onDeleteRowClick: Function;
}

function ListItemTable(props: ListItemTableProps) {
  return (
    <table className={style.listsTable}>
      <tbody>
        {props.list_items.map((row) => <ListItemRow key={row.id} item={row} onDeleteClick={props.onDeleteRowClick} />)}
      </tbody>
    </table>
  );
}

export default ListItemTable;
