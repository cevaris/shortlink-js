# ShortLink

Typescript based link/URL shortener

- Frontend (CLI) (Ionic)
- HTTP API (Express)
- KeyValue Database (AWS)
  - id -> url/link

Shorten

    curl -s -XPOST localhost:3000/shorten.json -H "Origin: http://localhost:4200"  -H "Content-Type: application/json" --data '{"link":"http://test.com"}' | jq .

Expanding

    curl -s 'localhost:3000/expand.json?id=b5wcgs' -H "Origin: http://localhost:4200" | jq .

Installs

    # dev packages
    npm install jest nodemon supertest ts-node ts-jest typescript @types/supertest @types/jest @types/typescript --save-dev
    # packages
    npm install axios cors express firebase-admin @types/cors@ jtypes/express --save

Development

    npm start dev
