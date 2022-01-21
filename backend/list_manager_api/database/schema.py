from datetime import datetime
from typing import Optional

from pydantic import BaseModel, constr


class BaseMeta(BaseModel):
    created_at: datetime
    updated_at: datetime


class ItemList(BaseMeta):
    id: int
    title: constr(strip_whitespace=True, min_length=1, max_length=80)
    description: Optional[constr(strip_whitespace=True, max_length=255)]


class ItemListCreate(BaseModel):
    title: constr(strip_whitespace=True, min_length=1, max_length=80)
    description: Optional[constr(strip_whitespace=True, max_length=255)]


class ItemListUpdate(BaseModel):
    title: Optional[constr(strip_whitespace=True, min_length=1, max_length=80)] = None
    description: Optional[constr(strip_whitespace=True, max_length=255)] = None


class ListItem(BaseMeta):
    id: int
    title: constr(strip_whitespace=True, min_length=1, max_length=80)


class ListItemCreate(BaseModel):
    title: constr(strip_whitespace=True, min_length=1, max_length=80)


class ListItemUpdate(BaseModel):
    title: Optional[constr(strip_whitespace=True, min_length=1, max_length=80)] = None
