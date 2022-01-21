from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise

from .config import get_settings
from .database import models
from .helpers import JSONResponseAccelerated
from .routes import router

app = FastAPI(
    root_path=get_settings().ROOT_URL,
    default_response_class=JSONResponseAccelerated,
)

app.include_router(router)


@app.on_event("startup")
async def do_startup():
    # database setup
    register_tortoise(
        app,
        db_url=get_settings().DB_URI,
        modules={"models": [models]},
        generate_schemas=True,
        add_exception_handlers=True,
    )
