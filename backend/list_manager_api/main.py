from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise
from web_health_checker.contrib.fastapi import router as health_check_router

from .config import get_settings
from .database import models
from .helpers import JSONResponseAccelerated
from .live_update import router as live_update_router
from .routes import router

tags_metadata = (
    {
        "name": "api",
        "description": ""
    },
    {
        "name": "updates",
        "description": ""
    },
)

app = FastAPI(
    openapi_tags=tags_metadata,
    root_path=get_settings().ROOT_URL,
    default_response_class=JSONResponseAccelerated,
    docs_url="/",
    redoc_url=None,
)

if get_settings().CORS_ALLOW_ORIGIN is not None:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[get_settings().CORS_ALLOW_ORIGIN],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(router, tags=["api"])
app.include_router(live_update_router, prefix="/updates", tags=["updates"])
app.include_router(health_check_router)


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
