
[![Build Status](https://travis-ci.org/NodeGreenville/nodegreenville.svg?branch=events_endpoint)](https://travis-ci.org/NodeGreenville/nodegreenville)

# NodeGreenville
Node Greenville web app

Successful merges to the 'dev' branch will deploy to https://nodegreenville-staging.herokuapp.com
Successful merges to the 'master' branch will deploy to https://nodegreenville-prod.herokuapp.com

Pull requests will not run a build but not deploy until merged.

#Database
The heroku deployments for staging and prod have a Postgres database that SHOULD be available at `process.env.DATABASE_URL`

## Installation on Local Machine
Add installation steps here.
1. Clone https://github.com/NodeGreenville/nodegreenville
2. ```cd nodegreenville```
3. Run ```npm install```
4. Run ```npm start```
  * If using nvm for nodejs version management ensure the use of node version 0.10.30 or greater.
5. Go to http://localhost:3000 for main site or
http://localhost:3000/blog to access the ghost blog

## Architecture Decisions

### Postgres

### Ghost (as Middleware)
The [GhostJS](https://ghost.org) portion of the code is located in the ```./ghost-app``` directory.

### Bookshelf.js (ORM)
