from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class BaseMeta(BaseModel):
    created_at: datetime
    updated_at: datetime


class ItemList(BaseMeta):
    id: int
    title: str
    description: Optional[str]


class ItemListCreate(BaseModel):
    title: str
    description: Optional[str]


class ItemListUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class ListItem(BaseMeta):
    id: int
    title: str


class ListItemCreate(BaseModel):
    title: str


class ListItemUpdate(BaseModel):
    title: Optional[str] = None
