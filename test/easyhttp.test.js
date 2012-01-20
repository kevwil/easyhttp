var assert = require('assert'),
    client = require('../easyhttp');

exports['get my public gists'] = function(){
    client.get("http://gist.github.com/api/v1/json/gists/kevwil", function(body,res){
        assert.equal(res.statusCode,200,'code should have been 200');
        if(body){body = JSON.parse(body);}
        assert(body.gists.length > 0,'error parsing # gists: '+body);
    });
}

exports['use PUT to follow a user on github'] = function(){
    client.put("https://api.github.com/users/following/octocat", function(body,res){
        assert.equal(res.statusCode,200);
        console.log(JSON.stringify(res.headers));
    });
}
