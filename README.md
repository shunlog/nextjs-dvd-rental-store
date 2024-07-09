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

The API can be accessed via the `/api` route.

It tries to include hypermedia links wherever possible, as specified in the [RESTful JSON](https://restfuljson.org/) guideline.
This means you should be able to travel to any related resource from a single URL.
For example, the result for `GET /api/films?search_string=south` includes URLs for the related actors of the film:
``` json
[
  {
    "film_id": 823,
    "title": "SOUTH WAIT",
    "actors": [
      {
        "id": 70,
        "url": "http://localhost:3000/api/actors/70",
        "first_name": "MICHELLE",
        "last_name": "MCCONAUGHEY"
      },
      {
        "id": 73,
        "url": "http://localhost:3000/api/actors/73",
        "first_name": "GARY",
        "last_name": "PENN"
      }
    ],
    ...
  }
]
```

### Films

#### **GET** `/api/films`

Get a list of all movies.

##### Query parameters

| Name          | Type   | Default | Description                                                              |
|---------------|--------|---------|--------------------------------------------------------------------------|
| search_string | string | ""      | Filter movies by an occurrence of the string in the title or description |

### Actors

#### **GET** `/api/actors`

Get a list of all actors.

#### **GET** `/api/actors/:id`

Get an actor by id.
