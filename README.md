<div align="center">

  ![image](./README_files/logo_word.jpg)

</div>

# Schoology Backend


Backend Repo for Schoology project, find front end at [schoology_frontend](https://github.com/Mohamed-EmadEldin/skoology-LMS.git)


## 📝 Table of Contents
- [About](#-about)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Built Using](#%EF%B8%8F-built-using)
- [Authors](#%EF%B8%8F-authors)

## 🧐 About
Due to the global trend of digitizing education and in the midst of emerging pandemics, a need has arisen for online education and schooling. <br/><br/>
<strong>Goal</strong> <br/>
 - To simulate the real-school daily interaction between student and teacher in the educational process.

 - To make the supervision of the child easier and more efficient .

 - To reduce the wasted days in the event of the need to work from home due to COVID high infection period or any other reason.

 - To make the process of administration easier and more efficient for the school.

<div align="right">
    <b><a href="#top">↥ back to top</a></b>
</div>

## 🏁 Getting Started

1) Clone the project

   ``` git clone https://github.com/Muhammed-Ahmed-Ismail/schoology_backend.git ```

2) Run genereateKeyPairs.js script to generate encription key pairs (public/privete)
3) Run create admin script to assign an admin to the system
4) create .env file with the following
```

PRIVATEKEYPATH = <project location>/utils/id_rsa_priv.key

PUBLICKEYPATH = <project location>/utils/id_rsa_pub.pem

```
5) make sure MySql is up and running and create database schoology
``` CREATE DATABASE schoology; ```
6) create config.json under config/ with the following with the appropriate connection string
```
{
  "development": {
    "username": <your user name>,
    "password": <your user password>,
    "database": "schoology",

    "host": <mysql connection url>,
    "dialect": "mysql"
  },
}
```
7) run npm install ``` npm install ```
8) Customize database connection string in config.json
9) for the first run only to set up the database in index.js uncomment ``` await sequelize.sync({alter:true}) ```
10) run the backend ```node index.js``` or ```nodemon index.js``` for live monitoring on code changes

<div align="right">
    <b><a href="#top">↥ back to top</a></b>
</div>

### Prerequisites

- [npm](https://npmjs.com)

- [mysql](https://www.mysql.com)

- optional [nodemon](https://www.npmjs.com/package/nodemon)

- optional [postman](https://www.postman.com) or similar to test routes

<div align="right">
    <b><a href="#top">↥ back to top</a></b>
</div>

## 🎈 Usage

check [routes](./routes/routes.js)

<div align="right">
    <b><a href="#top">↥ back to top</a></b>
</div>

## ⛏️ Built Using
- [MySql](https://www.mysql.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

<div align="right">
    <b><a href="#top">↥ back to top</a></b>
</div>

## ✍️ Authors

- [@Muhammed-Ahmed-Ismail](https://github.com/Muhammed-Ahmed-Ismail)
- [@Adham-Ahmed](https://github.com/Adham-Ahmed)
- [@AmSaleh21](https://github.com/AmSaleh21)
- [@radwa-mostafa-hassan](https://github.com/radwa-mostafa-hassan)

<div align="right">
    <b><a href="#top">↥ back to top</a></b>
</div>
