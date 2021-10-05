# TopFun

TopFun is a list based application where you can curate a list of your top foods, games, movies, resources, etc. and share it with others! Made with React, Express, vanilla CSS (no 3rd party components), Sequelize, PostgreSQL.

## Technologies
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=JavaScript&logoColor=333333" /></a>
* <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=PostgreSQL" /></a>
* <a href="https://sequelize.org/"><img src="https://img.shields.io/badge/-Sequelize-039BE5" /></a>
* <a href="https://www.npmjs.com/package/express"><img src="https://img.shields.io/badge/-Express.js-000000?logo=Express" /></a>
* <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white"></a>
* <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB"></a>
* <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white"></a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS3-1572B6?logo=CSS3" /></a>

## Features

### Landing Page
![landing](./readme-assets/images/topfun1.png)

### List Item View
![list-view](./readme-assets/images/topfun2.png)

### CRUD List and List Items
![list-items](./readme-assets/images/topfun3.png)




## Getting started
1. Clone this repository

```javascript
git clone this repo
```

2. Install npm dependencies for both the `/frontend` and `/backend`

```javascript
cd frontend
npm install

cd backend
npm install
```

3. In the `/backend` directory, create a `.env` based on the `.env.example` with proper settings
4. Setup your PostgreSQL user, password and database and ensure it matches your `.env` file
5. Run migrations and seeds in the `/backend`

```javascript
npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

6. Start both the backend and frontend

```javascript
npm start
```
7. Open localhost:3000 for front end
8. Test backend API w/ localhost:5000 on postman

## Contact

### Wes Trinh
<a href="https://www.linkedin.com/in/wes-trinh-28b526220/"><img src="./readme-assets/logos/linkedin-logo.png" height="28" align="middle" /></a>
<a href="https://angel.co/u/wes-trinh"><img src="./readme-assets/logos/angellist-logo.png" height="28" align="middle" /></a>
<a href="https://github.com/WesTrinhKL"><img src="./readme-assets/logos/github-logo.png" height="38" align="middle" /></a>

westrinh00@gmail.com
