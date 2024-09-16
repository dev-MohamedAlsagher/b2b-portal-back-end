# 2024-backend-g14

## Vereisten 

Ik verwacht dat volgende software reeds geïnstalleerd is:
- NodeJS
- Yarn
- MySQL Community Server

## Opstarten 

- yarn install
- .env met uw gegevens:
NODE_ENV=development
DATABASE_HOST=vichogent.be
DATABASE_USERNAME=SDP2-2324-G14
DATABASE_PASSWORD=groep14ww
DATABASE_NAME=SDP2_2324_DB_G14
DATABASE_PORT=40058
AUTH_JWT_SECRET=eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked
APP_PASSWORD=nyfv hznw bwiq pqod
APP_EMAIL=delawarereset@gmail.com
- yarn start

## Testen

.env.test met uw gegevens :

- NODE_ENV=test
- DB_HOST=localhost
- DB_PORT=3306
- DB_NAME=name
- DB_USERNAME=root
- DB_PASSWORD=password
- yarn test
