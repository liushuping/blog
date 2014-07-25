var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http');
var level = require('level');
//var util = require('../lib/util');
var issuesDB = level(__dirname + '/../db/issues');
//var Handlebars = require('handlebars');
//var indexView = fs.readFileSync(__dirname + '/../views/index.hbs', 'utf8');
//var indexTmpl = Handlebars.compile(indexView);

router.get('/', function(req, res) {
    //genIndex(res); 
    readAllIssues(function(issues)  {
console.log(issues);
        res.render('index', { issues: issues });
    });
});

var issueGetOptions = {
    valueEncoding: 'json'
};

function respondOnServerError(err, res) {
    res.statusCode = 200;
    res.end(err);
}

function extractIssue(issue) {
    return {
	title: issue.title,
	url: issue.url
    };
}

function readAllIssues(callback) {
    var stream = issuesDB.createValueStream(issueGetOptions);
    var issues = [];
    stream.on('data', function(issue) {
	issues.push(issue);
    });
    stream.on('end', function() {
	callback && callback(issues.reverse());
    });
}

//function respondIssues(issues, res) {
//    var body = indexTmpl({
//	issues: issues
//    });
//
//    res.statusCode = 200;
//    res.end(body);
//}
//
//function genIndex(res) {
//    readAllIssues(function(issues) {
//	respondIssues(issues, res);
//    });
//}

module.exports = router;
