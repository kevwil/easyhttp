var vows = require('vows'),
    assert = require('assert'),
    client = require('../easyhttp'),
    http = require('http');

// dummy server
http.createServer(function(req,res){
    var data = [];
    req.on('data',function(chunk){
       data.push(chunk);
    });
    req.on('end',function(){
        var dataString = data.join('');
        var body = (dataString ? JSON.parse(dataString) : '');
        var output = {'method':req.method,'headers':req.headers,'body':body};

        var code = (req.method == 'POST' ? 201 : 200);
        res.writeHead(code, {'Content-Type':'application/json'});
        res.end(JSON.stringify(output));
    });
}).listen(1337,'127.0.0.1');

// recite my vows
vows.describe('HTTP Methods').addBatch({
    'get':{
        topic:function(){
            client.get('http://127.0.0.1:1337/hello',this.callback);
        },
        'returns 200':function(body,res){
            assert.equal(res.statusCode, 200);
        }
    },
    'post':{
        topic:function(){
            client.post('http://127.0.0.1:1337/newdata', {'a':'aoeu','b':'snth'}, this.callback);
        },
        'return 201 and echos body back':function(body,res){
            assert.equal(res.statusCode, 201);
            var bodyObj = JSON.parse(body);
            assert.equal(bodyObj.body.a, "aoeu");
        }
    },
    'put':{
        topic:function(){
            client.put('http://127.0.0.1:1337/existing', {}, this.callback);
        },
        'return 200 successfully':function(body,res){
            assert.equal(res.statusCode, 200);
        }
    },
    'delete':{
        topic:function(){
            client.delete('http://127.0.0.1:1337/existing', this.callback);
        },
        'handles no params and returns 200':function(body,res){
            assert.equal(res.statusCode, 200);
        }
    }
}).export(module);
