from functools import lru_cache
from pathlib import Path
from typing import Optional

from pydantic import BaseSettings


class Settings(BaseSettings):
    ROOT_URL: Optional[str] = None
    API_KEY: str
    DATA_PATH: Path

    class Config:
        env_file = '.env'
        case_sensitive = True


@lru_cache()
def get_settings():
    """
    returns the Settings obj
    """
    return Settings()
