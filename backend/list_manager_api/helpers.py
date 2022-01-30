from secrets import compare_digest
from typing import Any, Optional

from fastapi import Depends, HTTPException, Request, Security
from fastapi.security import APIKeyCookie, APIKeyHeader, APIKeyQuery
from starlette.responses import JSONResponse
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN

try:
    import rapidjson as json
except ImportError:
    import json

from .config import get_settings
from .message_handler import LiveUpdateMessageHandler, LiveUpdateMessageType, UpdateMessage

api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)
api_key_cookie = APIKeyCookie(name="API_KEY", auto_error=False)
api_key_query = APIKeyQuery(name="api-key", auto_error=False)
message_handler = LiveUpdateMessageHandler()


def get_api_key(header=Security(api_key_header), cookie=Security(api_key_cookie), query=Security(api_key_query)):
    key = None
    if header:
        key = header
    elif query:
        key = query
    else:
        key = cookie

    if not key:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="No authentication provided"
        )
    return key


def verify_api_key(key: str = Depends(get_api_key)):
    if not compare_digest(get_settings().API_KEY, key):
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED, detail="Authentication provided invalid"
        )
    return key


async def sse_message_publisher(*, request: Request, list_id: Optional[int]):
    client_id, client_queue = message_handler.create_client(list_id=list_id)
    try:
        while True:
            if await request.is_disconnected():
                break
            yield await client_queue.get()
    finally:
        message_handler.remove_client(client_id)


class MessageCreator:
    """
    Used to easily create update messages
    ready to send to the client in JSON format
    """
    @staticmethod
    def base(update_type: LiveUpdateMessageType, list_id: int, item_id: Optional[int]) -> str:
        message = UpdateMessage(update_type=update_type, list_id=list_id, item_id=item_id)
        message = message.asdict()
        return json.dumps(message)

    @staticmethod
    def other(list_id: int, item_id: Optional[int]) -> str:
        return MessageCreator.base(LiveUpdateMessageType.OTHER, list_id, item_id)

    @staticmethod
    def create(list_id: int, item_id: Optional[int]) -> str:
        return MessageCreator.base(LiveUpdateMessageType.CREATE, list_id, item_id)

    @staticmethod
    def update(list_id: int, item_id: Optional[int]) -> str:
        return MessageCreator.base(LiveUpdateMessageType.UPDATE, list_id, item_id)

    @staticmethod
    def delete(list_id: int, item_id: Optional[int]) -> str:
        return MessageCreator.base(LiveUpdateMessageType.REMOVE, list_id, item_id)


class JSONResponseAccelerated(JSONResponse):
    def render(self, content: Any) -> bytes:
        return json.dumps(content, ensure_ascii=False).encode("utf-8")
