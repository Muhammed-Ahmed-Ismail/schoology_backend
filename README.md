<div align="center">

  ![image](./README_files/logo_word.jpg)

</div>

<h3>Schoology Backend</h3>

---
 
Backend Repo for Schoology project, find front end at [schoology_frontend](https://github.com/Mohamed-EmadEldin/skoology-LMS.git)


## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>
Due to the global trend of digitizing education and in the midst of emerging pandemics, a need has arisen for online education and schooling. <br/><br/>
<strong>Goal</strong> <br/>
 - To simulate the real-school daily interaction between student and teacher in the educational process.
<br/>
 - To make the supervision of the child easier and more efficient .
<br/>
 - To reduce the wasted days in the event of the need to work from home due to COVID high infection period or any other reason.
<br/>
 - To make the process of administration easier and more efficient for the school.

<p align="right">(<a href="#top">back to top</a>)</p>


## 🏁 Getting Started <a name = "getting_started"></a>

1) Clone the project

   ``` git clone https://github.com/Muhammed-Ahmed-Ismail/schoology_backend.git ```

2) create .env file with the following
```
PRIVATEKEYPATH = <project location>/utils/id_rsa_priv.key

PUBLICKEYPATH = <project location>/utils/id_rsa_pub.pem

```
3) make sure MySql is up and running and create database schoology
``` CREATE DATABASE schoology ```
4) create config.json under config/ with the following with the appropriate connection string
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
5) run npm install ``` npm install ```
6) for the first run only to set up the database in index.js uncomment ``` await sequelize.sync({alter:true}) ```
7) run the backend ```node index.js``` or ```nodemon index.js``` for live monitoring on code changes

<p align="right">(<a href="#top">back to top</a>)</p>

### Prerequisites

- [npm](https://npmjs.com)

- [mysql](https://www.mysql.com)

- optional [nodemon](https://www.npmjs.com/package/nodemon)

- optional [postman](https://www.postman.com) or similar to test routes


## 🎈 Usage <a name="usage"></a>

check [routes](./routes/routes.js)

## ⛏️ Built Using <a name = "built_using"></a>
- [MySql](https://www.mysql.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@Muhammed-Ahmed-Ismail](https://github.com/Muhammed-Ahmed-Ismail)
- [@Adham-Ahmed](https://github.com/Adham-Ahmed)
- [@AmSaleh21](https://github.com/AmSaleh21)
- [@radwa-mostafa-hassan](https://github.com/radwa-mostafa-hassan)
