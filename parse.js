var needle = require('needle');

var URL = 'http://www.ferra.ru/ru/techlife/news/';

needle.get(URL, function(err, res){
    if (err) throw err;
    console.log(res.body);
    console.log(res.statusCode);
});