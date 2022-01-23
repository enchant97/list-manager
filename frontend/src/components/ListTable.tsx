import { ItemList } from "../core/types";
import ListRow from "./ListRow";

export type ListTableProps = {
  item_lists: ItemList[];
  onListRowClick: Function;
}

function ListTable(props: ListTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.item_lists.map((row) => <ListRow key={row.id} item_list={row} onViewClick={props.onListRowClick} />)}
      </tbody>
    </table>
  );
}

export default ListTable;
