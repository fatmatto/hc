#!/usr/bin/env node
const r = require('superagent');
const prog = require('caporal');

prog
  .version('0.0.1')
  .description('A simple HTTP cli interface to send JSON')
  .argument('<method>', 'HTTP Method')
  .argument('<url>', 'HTTP Url')
  .argument('[body]', 'Request body')
  .argument('[headers...]', 'Headers')
  .action(function(args, options, logger) {


    // Arguments
    let {
      method,
      url,
      body,
      headers
    } = args;



    let request = r(method, url);

    if (args.headers)
      args.headers.forEach(header => {
        // Fix  me only first hit of :
        let tokens = header.split(":");
        request.set(tokens[0], tokens[1])
      })

    if (args.body) {
      request.send(JSON.parse(args.body))
    }

    request.end(function(err, response) {
      if (err)
        return console.error(err);
      return console.log(response.body);
    })



  });

prog.parse(process.argv);