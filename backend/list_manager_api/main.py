from fastapi import FastAPI

from .config import get_settings
from .helpers import JSONResponseAccelerated
from .routes import router

app = FastAPI(
    root_path=get_settings().ROOT_URL,
    default_response_class=JSONResponseAccelerated,
)

app.include_router(router)
