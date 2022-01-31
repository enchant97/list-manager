export type LoginDetails = {
  api_url: string;
  api_key: string;
}

export type ItemList = {
  created_at: Date;
  updated_at: Date;
  id: number;
  title: string;
  description: string;
}

export type ItemListCreate = {
  title: string;
  description: string | null;
}

export type ListItem = {
  created_at: Date;
  updated_at: Date;
  id: number;
  title: string;
}

export type ListItemCreate = {
  title: string;
}

export enum UpdateMessageType {
  OTHER = 0,
  CREATE = 1,
  UPDATE = 2,
  REMOVE = 3,
}

export type UpdateMessage = {
  update_type: UpdateMessageType;
  list_id: number;
  item_id: number | null;
}
