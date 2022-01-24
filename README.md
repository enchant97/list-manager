# List-Manager
Manage lists, using a REST api and a web front-end.

> Please note this project is still in development

## About Repo
- The 'main' branch should be considered unstable as tags/releases are used to determine stable versions
- This repo contains two projects, one containing the backend code and other containing frontend.
- Dockerfile and docker-compose files are provided to allow for a easy and consistent deployment.

### Backend
The backend is written in Python 3 using the FastApi library.

### Frontend
The frontend is written in typescript using React.

## Configuration
### Frontend
When the project is built it might need `REACT_APP_API_URL` to be set as a environment variable which allows for a the absolute url of where the api will be accessible to be set for example: `https://api.example.com`. If unset it will take either a users custom url or use `location.origin/api`.

### Backend
All configs are handled through environment variables.

| Name              | Description                                            | Default |
|:------------------|:-------------------------------------------------------|:--------|
| ROOT_URL          | Root url, used if behind a proxy                       | -       |
| CORS_ALLOW_ORIGIN | Allow a different origin to access api                 | -       |
| API_KEY           | The api key that will be used to authenticate requests |         |
| DB_URI            | URI of where db is                                     |         |

> Defaults that are blank are **required** fields.
