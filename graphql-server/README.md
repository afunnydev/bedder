# Bedder Travel

## Setup

Clone this repo.

```
git clone https://akiamarketing@bitbucket.org/akiamarketingteam/bedder-graphql.git
cd bedder-graphql
npm install
```

Create your environment variables

```
touch variables.env
nano variables.env
```

and input into the file the following.

```
FRONTEND_URL="http://localhost:3000"
BACKEND_URL="https://api.beddertravel.com/app.php/api/v1"
# if you use a local version of the backend, you can use http://localhost:8000/app.php/api/v1
```

## Modifications

### Model

I wrote a basic datamodel based on the API implementation of our backend. It is not final and there could be breaking changes to it. If you need some fields coming from the backend that are not in the datamodel, please add them with the correct type to ```src/datamodel.graphql```.

The Mutations and the Queries are defined in ```src/schema.graphql```. You need to add your Mutation or Query for, and then write the appropriate resolver in ```src/resolvers/Mutation.js``` or ```src/resolvers/Query.js```.

### Resolvers

The name of the resolver function should match the Mutation/Query name.

```
# schema.graphql

type Query {
  dog(id: String!): Dog
}

# Query.js

const Query = {
  dog(parent, args, context) {
    const dog = ...
    return dog
  }
}
```

I'm using [needle](https://www.npmjs.com/package/needle) to make API calls to the backend. It's easy and efficient.

The user's JWT token has been added to the context, so you can use it in your request like this:

```
const token = context.token;
```



