from secrets import compare_digest
from typing import Any

from fastapi import HTTPException, Security, Depends
from fastapi.security import APIKeyCookie, APIKeyHeader
from starlette.responses import JSONResponse
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN

try:
    import rapidjson as json
except ImportError:
    import json

from .config import get_settings

api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)
api_key_cookie = APIKeyCookie(name="API_KEY", auto_error=False)


def get_api_key(header=Security(api_key_header), cookie=Security(api_key_cookie)):
    key = header if header else cookie
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





class JSONResponseAccelerated(JSONResponse):
    def render(self, content: Any) -> bytes:
        return json.dumps(content, ensure_ascii=False).encode("utf-8")
