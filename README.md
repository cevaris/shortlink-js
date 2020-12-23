# ShortLink

Typescript based link/URL shortener

- Frontend (CLI) (Ionic)
- HTTP API (Express)
- KeyValue Database (AWS)
  - slug -> url/link

Shorten

    curl -i -XPOST localhost:3000/shorten.json -H "Content-Type: application/json" --data '{"link":"http://google.com"}'

Expanding

    curl -i 'localhost:3000/expand.json?slug=p2xgE3'

Installs

    # dev packages
    npm install jest nodemon supertest ts-node ts-jest typescript @types/supertest @types/jest @types/typescript --save-dev
    # packages
    npm install axios express firebase-admin @types/express --save

Development

    npm start dev
