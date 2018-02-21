/**
 * Starts the server for the WC server.
 *
 * Run this service on a single machine to send multiple requests to the WooCommerce instance without using an API Gateway.
 *
 * @link   https://aidenvalentine.com
 * @file   This file runs a server with the WC functions.
 * @author Aiden Valentine <aiden@xxxmultimedia.com>
 * @since  1.0.0
 * @todo   Add routing to the server.
 */

const express = require('express')
const bodyParser = require('body-parser')
const wcHelper = require('./woocommerce.js')

/**
 * Configure the environment.
 *
 * Specify the location and encoding of your env var YAML file.
 *
 * @type {Object}
 * @todo Make singleton.
 */
const config = {
  path: './serverless.env.yml',
  encoding: 'utf8'
};

/**
 * Load the environment variables from the YAML env file.
 * @param  {Object} env Specify a custom path if your file containing environment variables is named or located differently.
 */
require('env-yaml').config(config)

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/**
 * Handle routing.
 *
 * Listens on all routes.
 *
 * @param  {Object} req An Express 4.X request object.
 * @param  {Object} res An Express 4.X response object.
 * @return {Object}
 */
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  // res.end(JSON.stringify(req.body, null, 2))
  wcHelper.descriptionSummarizer(req.body, null, function(err, data) {
	  if (err) { callback(err); };
	  res.end(JSON.stringify(data, null, 2))
  });
})

/**
 * Run server on port 3000.
 */
app.listen(3000);
