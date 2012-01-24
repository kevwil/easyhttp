var http = require('http'),
    url = require('url');

// shortcuts for http methods
exports.get = function(requestUrl, callback){
    doRequest(requestUrl, callback);
}

exports.post = function(requestUrl, params, callback){
    var options = {method:'POST'};
    if(typeof params == 'function'){
        callback = params;
        params = {};
    }else{
        options['params'] = params;
    }
    doRequest(requestUrl, options, callback);
}

exports.put = function(requestUrl, params, callback){
    var options = {method:'PUT'};
    if(typeof params == 'function'){
        callback = params;
        params = {};
    }else{
        options['params'] = params;
    }
    doRequest(requestUrl, options, callback);
}

exports.delete = function(requestUrl, params, callback){
    var options = {method:'DELETE'};
    if(typeof params == 'function'){
        callback = params;
        params = {};
    }else{
        options['params'] = params;
    }
    doRequest(requestUrl, options, callback);
}

// basic call which handles all http methods
function doRequest(requestUrl, options, callback){
    // in case no options are used
    if(typeof options == "function"){callback = options;options = {}; }
    // parse url into parts
    requestUrl = url.parse(requestUrl, true);
    // options hash to pass to core http
    var settings = {
        host: hostForUrl(requestUrl),
        port: portForUrl(requestUrl),
        path: pathForUrl(requestUrl),
        headers: options.headers || {},
        method: options.method || 'GET'
    };
    // handle params
    if(options.params){
        options.params = JSON.stringify(options.params);
        settings.headers['Content-Type'] = 'application/json';
        settings.headers['Content-Length'] = options.params.length;
    }
    // create request object
    var req = http.request(settings);
    // send params if given
    if(options.params){ req.write(options.params); }
    // handle response
    req.on('response', function(res){
        res.body = '';
        res.setEncoding('utf-8'); // configurable?
        res.on('data', function(chunk){ res.body += chunk; });
        res.on('end', function(){ callback(res.body, res); });
    });
    // fire request
    req.end();
}
exports.doRequest = doRequest

function hostForUrl(urlObj){
  return (urlObj.auth ? urlObj.auth+'@'+urlObj.hostname : urlObj.hostname);
}

function portForUrl(urlObj){
  if(urlObj.port){
    return urlObj.port;
  }else{
    return (urlObj.protocol == 'https' ? '443' : '80');
  }
}

function pathForUrl(urlObj){
  var path = urlObj.pathname;
  if(urlObj.search){
    path = path+urlObj.search;
  }
  if(urlObj.hash){
    path = path+urlObj.hash;
  }
  return path;
}

