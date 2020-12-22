# ShortLink

Typescript based link/URL shortener

- Frontend (CLI) (Ionic)
- HTTP API (Express)
- KeyValue Database (AWS)
  - slug -> url/link

Shorten

    curl -i -XPOST localhost:3000/shorten.json -H "Content-Type: application/json" --data '{"link":"http://google.com"}'

Expanding

    curl -i 'localhost:3000/expand.json?slug=4128ko'

Installs

    # dev packages
    npm install nodemon typescript @types/typescript --save-dev
    # packages
    npm install express @types/express body-parser firebase-admin --save

Development

    npm start dev
