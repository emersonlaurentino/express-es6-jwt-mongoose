A basic project for an ES6 RESTful Express server with JWT, Passport and Mongoose.
==================================
[![Build Status](https://travis-ci.org/emersonlaurentino/express-es6-jwt-mongoose.svg?branch=master)](https://travis-ci.org/emersonlaurentino/express-es6-jwt-mongoose)
[![Coverage Status](https://coveralls.io/repos/github/emersonlaurentino/express-es6-jwt-mongoose/badge.svg?branch=master)](https://coveralls.io/github/emersonlaurentino/express-es6-jwt-mongoose?branch=master)

Get started
---------------
```sh
# clone it
git clone git@github.com:emersonlaurentino/express-es6-jwt-mongoose.git
cd express-es6-jwt-mongoose

# Make it your own
rm -rf .git && git init && npm init

# install dependences
npm i

# Start development live-reload server
PORT=4000 npm run dev

# Start production server:
PORT=4000 npm start
```

Run mongo
---------------
```sh
docker run --name mongo-example -v /docker/mongo-example/datadir:/data/db -p 27017:27017 -d mongo --auth
```

Create user on mongo
---------------
```sh
# shell of mongo on docker
docker exec -it mongo-example mongo admin

# create superuser 
db.createUser({ user: 'admin', pwd: '4dm1nP4ssw0rd', roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }] });

# auth connect
db.auth('admin', '4dm1nP4ssw0rd')

# connect on new database
use example

# create user with role of read and write
db.createUser({ user: 'userexample', pwd: 'us3rP4ssw0rd', roles: [{ role: 'readWrite', db: 'example' }] });
```

Docker Support
---------------
```sh

# Build your docker
docker build -t es6/api-service .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 4000:4000 es6/api-service
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port   
```