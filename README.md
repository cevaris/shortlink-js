# ShortLink

Typescript based link/URL shortener

- Frontend (CLI) (Ionic)
- HTTP API (Express)
- KeyValue Database (AWS)
  - slug -> url/link

Shorten

    curl -XPOST 'localhost:3000/shorten?link=http://google.com'

Expanding

    curl 'localhost:3000/sgev27'

Installs

    # dev packages
    npm install nodemon typescript @types/typescript --save-dev
    # packages
    npm install aws-sdk express @types/express
