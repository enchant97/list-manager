from typing import Union

from fastapi import APIRouter, Depends

from .database import crud, schema
from .helpers import verify_api_key

router = APIRouter(dependencies=(Depends(verify_api_key),))


@router.get("/lists", response_model=list[schema.ItemList])
async def get_lists():
    return await crud.read_item_lists()


@router.post("/lists", response_model=schema.ItemList)
async def new_list(new_list: schema.ItemListCreate):
    return await crud.create_item_list(new_list.title, new_list.description)


@router.delete("/lists")
async def delete_lists():
    await crud.delete_item_lists()


@router.get("/lists/{list_id}", response_model=schema.ItemList)
async def get_list_by_id(list_id: int):
    return await crud.read_item_list(list_id)


@router.put("/lists/{list_id}")
async def update_list_by_id(list_id: int, updated_list: schema.ItemListUpdate):
    await crud.update_item_list(list_id, **updated_list.dict(exclude_none=True))


@router.delete("/lists/{list_id}")
async def delete_list_by_id(list_id: int):
    await crud.delete_item_list(list_id)


@router.get("/lists/{list_id}/items", response_model=list[schema.ListItem])
async def get_list_items(list_id: int):
    return await crud.read_list_items_by_list(list_id)


@router.post("/lists/{list_id}/items", response_model=schema.ListItem)
async def new_list_item(list_id: int, new_list_item: schema.ListItemCreate):
    return await crud.create_list_item(new_list_item.title, list_id)


@router.delete("/lists/{list_id}/items")
async def delete_list_items(list_id: int):
    await crud.delete_list_items_by_list(list_id)


@router.get("/lists/{list_id}/items/{item_id}", response_model=schema.ListItem)
async def get_list_item_by_id(list_id: int, item_id: int):
    return await crud.read_list_item(list_id, item_id)


@router.put("/lists/{list_id}/items/{item_id}")
async def update_list_item_by_id(list_id: int, item_id: int, updated_list_item: schema.ListItemUpdate):
    await crud.update_list_item(list_id, item_id, updated_list_item.title)


@router.delete("/lists/{list_id}/items/{item_id}")
async def delete_list_item_by_id(list_id: int, item_id: int):
    await crud.delete_list_item(list_id, item_id)
