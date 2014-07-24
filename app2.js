var fs = require('fs');
var http = require('http');
var util = require('./util');
var level = require('level');
var issuesDB = level('./db/issues');

var indexTmpl = util.template('./views/index.hbs');

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

function respondIssues(issues, res) {
    var body = indexTmpl({
	issues: issues
    });

    res.statusCode = 200;
    res.end(body);
}

function genIndex(res) {
    readAllIssues(function(issues) {
	respondIssues(issues, res);
    });
}

var server = http.createServer(function(req, res) {
    genIndex(res);
});

server.listen(80);
