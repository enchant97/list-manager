import { ItemList } from "../core/types";
import ListRow from "./ListRow";
import style from '../styles/Table.module.css'

export type ListTableProps = {
  item_lists: ItemList[];
  onListRowClick: Function;
  onListRowDeleteClick: Function;
}

function ListTable(props: ListTableProps) {
  return (
    <table className={style.listsTable}>
      <tbody>
        {props.item_lists.map((row) => <ListRow key={row.id} item_list={row} onViewClick={props.onListRowClick} onDeleteClick={props.onListRowDeleteClick} />)}
      </tbody>
    </table>
  );
}

export default ListTable;
