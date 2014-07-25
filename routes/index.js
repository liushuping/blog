var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http');
var level = require('level');
var issuesDB = level(__dirname + '/../db/issues');

router.get('/', function(req, res) {
    readAllIssues(function(issues)  {
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

module.exports = router;
