This is a [Next.js](https://nextjs.org/) project implementing a REST API for a DVD rental database ([Pagila](https://github.com/devrimgunduz/pagila)).
It was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)

## Install

Create a PostgreSQL database called `pagila-db` and fill it with data from [this repo](https://github.com/devrimgunduz/pagila):
``` sh
psql -f pagila-schema.sql -d pagila-db
psql -f pagila-data.sql -d pagila-db
```

Install npm dependencies:
``` sh
npm install
```

## Running

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## REST API

The API can be accessed via the `/api` route:

### Films

#### **GET** `/api/films`

Get a list of all movies.

### Actors

#### **GET** `/api/actors`

Get a list of all actors.
