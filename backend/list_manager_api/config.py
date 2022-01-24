from functools import lru_cache
from typing import Optional

from pydantic import BaseSettings


class Settings(BaseSettings):
    ROOT_URL: Optional[str] = None
    CORS_ALLOW_ORIGIN: Optional[str] = None
    API_KEY: str
    DB_URI: str

    class Config:
        env_file = '.env'
        case_sensitive = True


@lru_cache()
def get_settings():
    """
    returns the Settings obj
    """
    return Settings()
