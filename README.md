<div align="center">
  <h3 align="center">Trainer</h3>
  <p>This is a microservice made with Adonis.js (https://adonisjs.com/)</p>
</div>

<p>The tempalte uses:</p>
<ul>
  <li>ESlint / code syntax</li>
  <li>Prettier / code format</li>
  <li>nyc / code coverage</li>
</ul>

[OpenAPI 3.0.0](https://github.com/taller-II-2023-q1-g8/fiufit.fiuba.plan.api/blob/master/swagger.yml)

## Getting Started

Start the preoject:
   ```sh
   docker compose up
   ```

   ```sh
   npm install
   ```

## Ace commands

   Migrations:
   ```sh
   node ace migration:run
   ```
   
   Seeder:
   ```sh
   node ace db:seed
   ```

## Tests

  Run all test:
   ```sh
   npm run test
   ```

Run unit test:
   ```sh
   node ace test unit
   ```

Run functional test:
   ```sh
   node ace test functional
   ```   

Code coverage:
   ```sh
   npm run coverage
   ```

