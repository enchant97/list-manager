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
