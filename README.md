# List-Manager
Manage lists, using a REST api and a web front-end.

> Please note this project is still in development

## About Repo
- The 'main' branch should be considered unstable as tags/releases are used to determine stable versions
- This repo contains two projects, one containing the backend code and other containing frontend.

### Backend
The backend is written in Python 3 using the FastApi library.

### Frontend
The frontend is written in typescript using React.

## Configuration
### Frontend
When the project is built it will need `REACT_APP_API_URL` to be set as a environment variable which should be set to the absolute url of where the api will be accessible for example: `https://api.example.com`.
