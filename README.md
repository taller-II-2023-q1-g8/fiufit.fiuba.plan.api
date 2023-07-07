[![codecov](https://codecov.io/gh/taller-II-2023-q1-g8/fiufit.fiuba.plan.api/branch/master/graph/badge.svg?token=DF3TY5TDLJ)](https://codecov.io/gh/taller-II-2023-q1-g8/fiufit.fiuba.plan.api)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/taller-II-2023-q1-g8/fiufit.fiuba.app.mobile">
    <img src="https://firebasestorage.googleapis.com/v0/b/fiufit-73a11.appspot.com/o/app.png?alt=media&token=77feb7b5-9fcc-4cd0-aa4a-54236b810170" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Plans Microservice</h3>

  <p align="center">
    REST API
    <br />
    <a href="https://fiufit-plans2.onrender.com/docs">View Docs</a>
    .
    <a href="https://github.com/github_username/repo_name">View Demo</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## About the project

The APP has Plans which represent a set of excercises to be executed at a instance in time. Once executed, such exercises emit metrics objects to the  [Goals and Metrics Microservice](https://github.com/taller-II-2023-q1-g8/fiufit.fiuba.goal.api/blob/main/README.md) for them to be processed in order to progress towards such user goals.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
* [![Node.js][Node.js]][Node.js-url]
* [![Adonis.js][Adonis.js]][Adonis.js-url]
* [![PostgresQL][PostgresQL]][PostgresQL-url]
* [![Swagger][Swagger]][Swagger-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* Docker-Compose
* Node
* Adonis.js

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/taller-II-2023-q1-g8/fiufit.fiuba.plan.api.git
   ```
2. Run App with Docker-Compose
   ```sh
   docker compose up
   ```
3. This will have the microservice running on localhost:3000

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

This is a basic example of the main workflow:
- **Adding a new Plan:**  ``` POST /api/v1/plans ```
- **Retrieving a list of Plans**  ``` GET /api/v1/plans```
- **Adding a new Exercise:**  ``` POST /api/v1/exercises ```
- **Adding an Exercise to a Plan**  ``` POST /api/v1/plans/{id}/exercises/{exercise_id}```

_For more examples, please refer to the [Documentation](https://fiufit-plans2.onrender.com/docs)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Define the project Structure
- [x] Fetch Trainers from Users Microservice
- [x] Fetch Athletes from Users Microservice
- [x] Creation of a Plan with Trainer
- [x] Creation of multiple Exercises
- [x] Add Exercices to Plan

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact
Axel Perez Machado - aperezm@fi.uba.ar    
Lautaro Goijman - lgoijman@fi.uba.ar

Project Link: [https://github.com/taller-II-2023-q1-g8](https://github.com/taller-II-2023-q1-g8)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node.js-url]: https://nodejs.org/
[Adonis.js]: https://img.shields.io/badge/adonisjs-%23220052.svg?style=for-the-badge&logo=adonisjs&logoColor=white
[Adonis.js-url]: [https://expressjs.com/](https://adonisjs.com/)
[Next-url]: https://nextjs.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Swagger]: https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white
[Swagger-url]: https://swagger.io/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/https://github.com/github_username/repo_name
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[FastAPI]: https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi
[FastAPI.com]: https://fastapi.tiangolo.com/
[JQuery-url]: https://jquery.com 
[PostgresQL-url]: https://www.postgresql.org/
[PostgreSQL]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL.com]:https://www.postgresql.org/
[Firebase]: https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase
[Firebase.com]: https://firebase.google.com/
