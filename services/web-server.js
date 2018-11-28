const http = require('http');
const express = require('express');
const ipfilter = require('express-ipfilter').IpFilter;
const webServerConfig = require('../config/web-server.js');
const database = require('./database.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();

    // Whitelist the following IPs
    const ips = ['127.0.0.1', "::1"];

    // Create the server
    app.use(ipfilter(ips, {
      mode: 'allow'
    }));

    app.use(morgan('combined'));
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());

    httpServer = http.createServer(app);

    app.get('/test', async (req, res) => {
      const result = await database.simpleExecute('select user, systimestamp from dual').catch(function (err) {
        console.error(err);
      });
      const user = result.rows[0].USER;
      const date = result.rows[0].SYSTIMESTAMP;

      res.end(`DB user: ${user}\nDate: ${date}`);
    });

    app.get('/execute', async (req, res) => {
      let query = req.query.query;
      console.log(query);
      database.simpleExecute(query).then(function (result) {
        res.json(result);
      }).catch(function (error) {
        res.status(500);
        res.json({
          error: error
        });
      });
    });

    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

function close() {
  return new Promise((resolve, reject) => {
    if (httpServer) {
      httpServer.close((err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    } else {
      resolve();
    }
  });
}

module.exports.close = close;

module.exports.initialize = initialize;
