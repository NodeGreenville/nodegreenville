
[![Build Status](https://travis-ci.org/NodeGreenville/nodegreenville.svg?branch=master)](https://travis-ci.org/NodeGreenville/nodegreenville)
[![Code Climate](https://codeclimate.com/github/NodeGreenville/nodegreenville/badges/gpa.svg)](https://codeclimate.com/github/NodeGreenville/nodegreenville)

# NodeGreenville
Node Greenville web app

Successful merges to the 'dev' branch will deploy to https://nodegreenville-staging.herokuapp.com
Successful merges to the 'master' branch will deploy to https://nodegreenville-prod.herokuapp.com

Pull requests will run a build, but will not deploy until merged.

## Installation on Local Machine

1. Clone https://github.com/NodeGreenville/nodegreenville
2. ```cd nodegreenville```
3. Run ```npm install```
4. Run ```npm start```
  * If using nvm for nodejs version management ensure the use of node version 0.10.30 or greater.
5. Go to http://localhost:3000 for main site or
http://localhost:3000/blog to access the ghost blog

## Architecture Decisions

### Postgres
The heroku deployments for staging and prod have a Postgres database that SHOULD be available at `process.env.DATABASE_URL`

### Ghost (as Middleware)
~~The [GhostJS](https://ghost.org) portion of the code is located in the ```./ghost-app``` directory.~~

### Bookshelf.js (ORM)

### E2E Testing
[NighwatchJS](http://nightwatchjs.org/guide)
