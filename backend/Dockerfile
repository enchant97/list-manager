
FROM python:3.10-slim-bullseye as builder

    WORKDIR /app

    COPY requirements.txt requirements.txt

    RUN python -m venv .venv

    # also allow for DOCKER_BUILDKIT=1 to be used
    RUN --mount=type=cache,target=/root/.cache ./.venv/bin/pip install -r requirements.txt

FROM python:3.10-alpine3.15

    WORKDIR /app
    EXPOSE 8000

    COPY --from=builder /app/.venv .venv

    COPY list_manager_api list_manager_api

    CMD ./.venv/bin/uvicorn 'list_manager_api.main:app' --host '0.0.0.0' --port '8000'
