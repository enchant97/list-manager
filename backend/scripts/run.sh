#!/bin/sh

exec uvicorn 'list_manager_api.main:app' --host '0.0.0.0' --port '8000'
