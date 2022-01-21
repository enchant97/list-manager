from typing import Union

from fastapi import APIRouter, Depends
from pydantic import UUID4

from .helpers import verify_api_key
from .schema import (ManagerList, ManagerListCreate, ManagerListItem,
                     ManagerListItemCreate, ManagerListItemUpdate,
                     ManagerListUpdate)

router = APIRouter(dependencies=(Depends(verify_api_key),))


@router.get("/lists", response_model=list[ManagerList])
async def get_lists():
    pass


@router.post("/lists", response_model=ManagerList)
async def new_list(new_list: ManagerListCreate):
    pass


@router.delete("/lists")
async def delete_lists():
    pass


@router.get("/lists/{list_id}", response_model=ManagerList)
async def get_list_by_id(list_id: UUID4):
    pass


@router.put("/lists/{list_id}", response_model=ManagerListUpdate)
async def update_list_by_id(list_id: UUID4):
    pass


@router.delete("/lists/{list_id}")
async def delete_list_by_id(list_id: UUID4):
    pass


@router.get("/lists/{list_id}/items", response_model=list[ManagerListItem])
async def get_list_items(list_id: UUID4):
    pass


@router.post("/lists/{list_id}/items", response_model=ManagerListItem)
async def new_list_item(list_id: UUID4, new_list_item: ManagerListItemCreate):
    pass


@router.delete("/lists/{list_id}/items")
async def delete_list_items(list_id: UUID4):
    pass


@router.get("/lists/{list_id}/items/{item_id}", response_model=ManagerListItem)
async def get_list_item_by_id(list_id: UUID4, item_id: UUID4):
    pass


@router.put("/lists/{list_id}/items/{item_id}")
async def update_list_item_by_id(list_id: UUID4, item_id: UUID4, updated_list_item: ManagerListItemUpdate):
    pass


@router.delete("/lists/{list_id}/items/{item_id}")
async def delete_list_item_by_id(list_id: UUID4, item_id: UUID4):
    pass
