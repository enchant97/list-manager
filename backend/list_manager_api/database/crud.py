from typing import Optional

from .models import ItemList, ListItem


async def create_item_list(title: str, description: Optional[str] = None) -> ItemList:
    return await ItemList.create(title=title, description=description)


async def read_item_lists() -> list[ItemList]:
    return await ItemList.all()


async def read_item_list(list_id: int) -> ItemList:
    return await ItemList.get(id=list_id)


async def update_item_list(
        list_id: int,
        title: Optional[str] = None,
        description: Optional[str] = None) -> ItemList:
    item_list = await ItemList.get(id=list_id)
    if title is not None:
        item_list.title = title
    if description is not None:
        item_list.description = description
    await item_list.save()
    return item_list


async def delete_item_lists():
    await ItemList.all().delete()


async def delete_item_list(list_id: int):
    await ItemList.filter(id=list_id).delete()


async def create_list_item(title: str, related_list_id: int) -> ListItem:
    return await ListItem.create(title=title, related_list_id=related_list_id)


async def read_list_items_by_list(list_id: int) -> list[ListItem]:
    return await ListItem.filter(related_list_id=list_id).all()


async def read_list_item(related_list_id: int, item_id: int) -> ListItem:
    return await ListItem.get(id=item_id, related_list_id=related_list_id)


async def update_list_item(related_list_id: int, item_id: int, title) -> ListItem:
    item = await ListItem.get(id=item_id, related_list_id=related_list_id)
    item.title = title
    await item.save()
    return item


async def delete_list_items_by_list(list_id: int):
    await ListItem.filter(related_list_id=list_id).delete()


async def delete_list_item(related_list_id: int, item_id: int):
    await ListItem.filter(id=item_id, related_list_id=related_list_id).delete()
