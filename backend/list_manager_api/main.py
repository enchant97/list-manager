from fastapi import FastAPI
from .routes import router
from .config import get_settings

app = FastAPI(
    root_path=get_settings().ROOT_URL,
)

app.include_router(router)
