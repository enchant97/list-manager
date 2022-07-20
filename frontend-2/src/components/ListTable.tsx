import styles from "./Table.module.css";
import { Component, For } from "solid-js";
import { ItemList } from "../core/types";

export type ListRowProps = {
  item_list: ItemList;
  onViewClick: Function;
  onDeleteClick: Function;
}

export type ListTableProps = {
  item_lists: ItemList[];
  onListRowClick: Function;
  onListRowDeleteClick: Function;
}

const ListRow: Component<ListRowProps> = (props) => {
  return (
    <tr>
      <td>{props.item_list.title}</td>
      <td><button onClick={() => props.onViewClick(props.item_list.id)}>View</button></td>
      <td><button onClick={() => props.onDeleteClick(props.item_list.id)}>Delete</button></td>
    </tr>
  );
};

const ListTable: Component<ListTableProps> = (props) => {
  return (
    <table class={styles.Table}>
      <thead>
        <tr>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <For each={props.item_lists}>
          {(row) => <ListRow
            item_list={row}
            onViewClick={props.onListRowClick}
            onDeleteClick={props.onListRowDeleteClick}
          />}
        </For>
      </tbody>
    </table>
  );
};

export default ListTable;
