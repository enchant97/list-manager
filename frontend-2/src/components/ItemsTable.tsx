import { Component } from "solid-js";
import { ListItem } from "../core/types";
import style from './Table.module.css'

export type ItemsTableProps = {
  list_items: ListItem[];
  onDeleteRowClick: Function;
}

type ItemRowProps = {
  item: ListItem;
  onDeleteClick: Function;
}

const ItemRow: Component<ItemRowProps> = (props) => {
  return (
    <tr>
      <td>{props.item.title}</td>
      <td><button onClick={() => { props.onDeleteClick(props.item.id) }}>Delete</button></td>
    </tr>
  );
}

const ItemsTable: Component<ItemsTableProps> = (props) => {
  return (
    <table class={style.Table}>
      <tbody>
        {props.list_items.map((row) => <ItemRow
          item={row}
          onDeleteClick={props.onDeleteRowClick}
        />)}
      </tbody>
    </table>
  );
}

export default ItemsTable;
