from fastapi import APIRouter, Depends, Request
from sse_starlette.sse import EventSourceResponse

from .database import crud
from .helpers import sse_message_publisher, verify_api_key

router = APIRouter(dependencies=(Depends(verify_api_key),))


@router.get("/lists", response_class=EventSourceResponse)
async def all_updates(request: Request):
    return EventSourceResponse(sse_message_publisher(request=request, list_id=None))


@router.get("/lists/{list_id}", response_class=EventSourceResponse)
async def specific_list_updates(list_id: int, request: Request):
    await crud.read_item_list(list_id)
    return EventSourceResponse(sse_message_publisher(request=request, list_id=list_id))
