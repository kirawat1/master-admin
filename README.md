# Developing

## Environment

- NodeJS v20.11.1
- npm v10.4.0

## Install Dependency

```bash
npm i # or npm install
```

## Setting the .env

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