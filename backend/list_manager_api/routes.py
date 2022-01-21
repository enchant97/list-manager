from typing import Union

from fastapi import APIRouter, Depends

from .database import schema
from .helpers import verify_api_key

router = APIRouter(dependencies=(Depends(verify_api_key),))


@router.get("/lists", response_model=list[schema.ItemList])
async def get_lists():
    pass


@router.post("/lists", response_model=schema.ItemList)
async def new_list(new_list: schema.ItemListCreate):
    pass


@router.delete("/lists")
async def delete_lists():
    pass


@router.get("/lists/{list_id}", response_model=schema.ItemList)
async def get_list_by_id(list_id: int):
    pass


@router.put("/lists/{list_id}", response_model=schema.ItemListUpdate)
async def update_list_by_id(list_id: int):
    pass


@router.delete("/lists/{list_id}")
async def delete_list_by_id(list_id: int):
    pass


@router.get("/lists/{list_id}/items", response_model=list[schema.ListItem])
async def get_list_items(list_id: int):
    pass


@router.post("/lists/{list_id}/items", response_model=schema.ListItem)
async def new_list_item(list_id: int, new_list_item: schema.ListItemCreate):
    pass


@router.delete("/lists/{list_id}/items")
async def delete_list_items(list_id: int):
    pass


@router.get("/lists/{list_id}/items/{item_id}", response_model=schema.ListItem)
async def get_list_item_by_id(list_id: int, item_id: int):
    pass


@router.put("/lists/{list_id}/items/{item_id}")
async def update_list_item_by_id(list_id: int, item_id: int, updated_list_item: schema.ListItemUpdate):
    pass


@router.delete("/lists/{list_id}/items/{item_id}")
async def delete_list_item_by_id(list_id: int, item_id: int):
    pass
