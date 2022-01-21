from datetime import datetime
from typing import Optional

from pydantic import UUID4, BaseModel


class BaseMeta(BaseModel):
    created_at: datetime
    updated_at: datetime


class ManagerList(BaseMeta):
    id: UUID4
    title: str
    description: str


class ManagerListCreate(BaseModel):
    title: str
    description: str


class ManagerListUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class ManagerListItem(BaseMeta):
    id: UUID4
    title: str
    description: str


class ManagerListItemCreate(BaseModel):
    title: str
    description: str


class ManagerListItemUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
