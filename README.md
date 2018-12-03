Usage
# Oracle Node.js Proxy

## About

This is a proof of concept tool that makes it possible to expose an Oracle database via a web API. The only endpoint that has been worked out is the execution of an plain SQL query. The result of the query is the content of the API response.
For a more REST-like approach, CRUD controllers would have to be added per entity. To keep the tool as generic as possible, they are here not included.

## Installation

- Install ODPI-C by following instructions @ https://oracle.github.io/odpi/doc/installation.html

## Configuration

Configuration happens through environment variables. For the database connection `USER`, `PASSWORD` and `CONNECTSTRING` are configurable. See `config/database.js` for details. The webserver port is configurable through the `HTTP_PORT` variable (uses `3000` by default).

## Booting

- Boot with `node index.js`

## Credits

The code is heavily inspired by [an article](https://blogs.oracle.com/oraclemagazine/build-rest-apis-for-nodejs-part-1) by [Dan McGhan](https://twitter.com/dmcghan)