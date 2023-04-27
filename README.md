# create database
    CREATE DATABASE `nodelogin`;

## create table

```
CREATE TABLE accounts ( id SERIAL UNIQUE, 
username varchar(50) NOT NULL, 
password varchar(255) NOT NULL, 
email varchar(100) NOT NULL, 
PRIMARY KEY (id) )
```
# insert user

``` INSERT INTO accounts (id, username, password, email) VALUES (1, 'test', 'test', 'test@test.com'); ```

## Installation
```bash
$ npm i express
$ npm i express-session
$ npm i pg
$ npm i dotenv
$ npm i typescript
$ npm i -g ts-node 
$ npm install -D @types/express-session@1.17.0 
$ npm i -g ts-node
```

# View Localhost
localhost:3000
