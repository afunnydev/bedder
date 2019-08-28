# Bedder

## Frontend

This project uses React.js on the frontend. More info in the ```frontend``` folder.

It is deployed from the ```frontend``` folder, using Netlify on every push to the master branch.

## GraphQL Server

This project uses an Apollo server between the frontend and the backend to use GraphQL. You can find it in the ```graphql-server``` folder.

It is deployed on Heroku by pushing on the heroku origin. For example, if the origin is ```heroku-graphql```:

```
git subtree push --prefix graphql-server heroku-graphql master
```

## Backend

This project uses Symfony 4 on the backend. More info in the ```backend``` folder.

It is deployed on Heroku by pushing on the heroku origin. For example, if the origin is ```heroku-backend```:

```
git subtree push --prefix backend heroku-backend master
```