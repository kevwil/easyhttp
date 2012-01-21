EasyHttp
========
A simplified wrapper around [the core node.js http client][http].

Basics
------
There are simple functions for 'get', 'post', 'put', and 'delete'.

With the exception of 'get', they all take a second argument in the
form of a hash of params.

All require a callback function which will receive the body and [the ClientResponse object][response]. 

GET
---
	var client = require('easyhttp');
	client.get('http://server.com/foo/bar',function(body,res){
		// do something
	});

POST
----
	var client = require('easyhttp');
	client.post('http://server.com/users/create',
		{'fname':'Luke','lname':'Skywalker'},
		function(body,res){
			// do your thing
		}
	);

Low Level
---------
All the simple functions end up calling the 'doRequest' method, which looks like this:

	var client = require('easyhttp');
	client.doRequest(
		'http://server.com/service',
		{
			'method':'POST',
			'headers':{'Authorization':'token OAUTH-TOKEN'},
			'params':{'status':'You\'ll never guess what she said next ...''}
		},
		function(body,res){
			// shake your bootay
		}
	);

Why?
----
I find the node.js http client usage to be fast but verbose, so I decided to try to simplify it.


[http]:http://nodejs.org/docs/latest/api/http.html#http.request
[response]:http://nodejs.org/docs/latest/api/http.html#http.ClientResponse