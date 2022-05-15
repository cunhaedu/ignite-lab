<div style="display:flex;gap: 5px;align-items: center;margin-bottom: 5px">
  <img src='./public/nestjs_logo.png' alt='nestjs' width='35px' />
  <img src='./public/graphql_logo.png' alt='graphql' width='35px' />
  <img src='./public/kafka_logo.png' alt='kafka' width='35px' />
  <img src='./public/nextjs_logo.png' alt='nextjs' width='35px' />
  <img src='./public/apollo-graphql_logo.svg' alt='apollo-graphql' width='25px' />
</div>

# Ignite Lab

A Rocketseat event that aims to create a project with microservice architecture that uses NestJS, GraphQL, Prisma, Kafka and Apollo technologies

## :pushpin: Content Table

* [Features](#rocket-features)
* [Database Model](#clipboard-database-model)
* [First steps](#construction_worker-first-steps)
* [Technologies](#rocket-technologies)
* [License](#closed_book-license)

## :rocket: Features

* Purchase Service:
  * Register Product
  * Products List
  * Purchases List
  * Product purchase
  * List available products for purchase

* Classroom Service
  * Enrollment List
  * Students List
  * Courses List
  * Register Courses
  * List Student Courses
  * List Course Content

## :clipboard: Database model

<!-- ![model](public/erd.png) -->

Coming soon

## :construction_worker: First steps

### Setup an authorization service

It's pretty common in a microservice application we use a thirty authorization
service, once create one and maintain it can get a little bit harder. So, for this
project we use the [Auth0](https://auth0.com/) to handle it for us in a way that
everything you need to do is open an account in Auth0, set up an api, get your
credentials and put it in the .env files of the applications.

## :runner: Running docker-compose

The docker-compose file will set up the environment you need to execute this
entire appplication, such as a postgres database and a kafka container. To be
able to execute the docker-compose you first need to have 
[Docker](https://www.docker.com/) and [Docker compose](https://docs.docker.com/compose/) in your machine, then, you can run the following command:

```bash
docker-compose up -d
```

## :rocket: Technologies

This project uses the following technologies:

* [NestJS](https://nestjs.com/)
* [GraphQL](https://graphql.org/)
* [Prisma](https://www.prisma.io/)
* [Kafka](https://kafka.apache.org/)
* [Apollo](https://www.apollographql.com/)

## :closed_book: License

This project is under MIT License.See the [LICENSE](./LICENSE) file for more details.
