# Developing

![Main Dashboard](/screenshot/main.png)
*Main Dashboard*

![Edit Dashboard](/screenshot/edit.png)
*Edit Dashboard*

## Environment

- NodeJS v20.11.1
- npm v10.4.0

## Install Dependency

```bash
npm i # or npm install
```

## Setting the .env

- Add .env file

```bash
# Provider is MySQL
DATABASE_URL="mysql://<USER>:<PASSWORD>@<HOST>:<PORT>/masterdb"
```

## Prisma

```bash
npx prisma migrate dev --name init
npm install @prisma/client
```

## Run Dev Server
```bash
npm run dev
```