import { Component, For } from "solid-js";
import { ListItem } from "../core/types";

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
      <td class="flex justify-end	btn-group">
        <button
          class="btn btn-outline btn-error btn-sm"
          onClick={() => { props.onDeleteClick(props.item.id) }}>Delete</button>
      </td>
    </tr>
  );
}

const ItemsTable: Component<ItemsTableProps> = (props) => {
  return (
    <div class="overflow-x-auto">
      <table class="table w-full">
        <tbody>
          <For each={props.list_items}>
            {row => <ItemRow
              item={row}
              onDeleteClick={props.onDeleteRowClick}
            />}
          </For>
        </tbody>
      </table>
    </div>
  );
}

export default ItemsTable;
