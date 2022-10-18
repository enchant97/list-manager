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
      <td class="flex justify-end	gap-2">
        <button
          class="btn btn-outline btn-sm"
          onClick={() => props.onViewClick(props.item_list.id)}>View</button>
        <button
          class="btn btn-outline btn-error btn-sm"
          onClick={() => props.onDeleteClick(props.item_list.id)}>Delete</button>
      </td>
    </tr>
  );
};

const ListTable: Component<ListTableProps> = (props) => {
  return (
    <div class="overflow-x-auto">
      <table class="table w-full">
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
    </div>
  );
};

export default ListTable;
