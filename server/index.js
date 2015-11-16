'use strict';

// libs
var express = require( 'express' );
var Download = require('download');
var cors = require( 'cors' );
var bodyParser = require( 'body-parser' );
var _ = require( 'lodash' );

// requires
var packageJson = require( './package.json' );

// vars
var serverAddress = null;

// init app
var app = express();
app.use( cors() );                  // enable cors (default allows all)
app.use( bodyParser.json() );       // enable request body parsing (read stuff people sent us)
app.use(express.static('public'));  // serve static files from public/ folder

// routes
app.get( '/', function ( req, res ) {
  res.send( 'Server ready... ' );
} );

app.post( '/request-gif', function ( request, result ) {

  // check for parameter
  if(request && request.body && request.body.url) {

    // start downloading the file and add it to the public/gif folder
    new Download()
      .get(request.body.url)
      .dest('public/gif')
      .run(function(error, files){

        // continue if no error and valid result set
        if(!error && files && files.length) {

          // return the path to the downloaded file
          result.send({
            error:false,
            file: serverAddress + '/gif/' + _.first(_.first(files).history)
          });

        } else {

          // something went wrong, return error
          result.send({
            error:true,
            errorMsg:"Coudn't download file, error or no files",
            errorObject:error
          });

        }
      });

  } else {

    // send error, no valid request
    result.send({
      error:true,
      errorMsg:'No body or url posted'
    });

  }
});

// launch express server
var server = app.listen( 3000, function () {
  var hostname = server.address().address === '::' ? 'localhost' : server.address().address;
  var port = server.address().port;

  // set server address
  serverAddress = 'http://' + hostname + ':' + port;
  console.log( '%s listening at %s', packageJson.name, serverAddress );
});