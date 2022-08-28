# syntax=docker/dockerfile:1.4
ARG PYTHON_VERSION=3.10

FROM python:${PYTHON_VERSION}-slim as builder

    WORKDIR /app

    COPY requirements.txt requirements.txt

    RUN python -m venv .venv
    ENV PATH="/app/.venv/bin:$PATH"

    # also allow for DOCKER_BUILDKIT=1 to be used
    RUN --mount=type=cache,target=/root/.cache pip install -r requirements.txt

FROM python:${PYTHON_VERSION}-alpine

    WORKDIR /app
    ENV PATH="/app/.venv/bin:$PATH"
    EXPOSE 8000

    COPY --from=builder --link /app/.venv .venv

    COPY list_manager_api list_manager_api
    COPY scripts/* ./

    CMD /bin/sh run.sh

    HEALTHCHECK --interval=1m --start-period=10s \
        CMD /bin/sh health-check.sh
