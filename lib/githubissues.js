var path = require('path');
var level = require('level');
var issuesDB = level(path.join(__dirname, '../db/issues'));

var issueGetOptions = {
    valueEncoding: 'json'
};

function getAll(callback) {
    var issues = [];
    var stream = issuesDB.createValueStream(issueGetOptions);

    stream.on('data', function(issue) {
        issues.push(issue);
    });

    stream.on('end', function() {
	callback && callback(issues.reverse());
    });
}

function get(id, callback) {
    issuesDB.get(id, issueGetOptions, function(err, issue) {
        callback(err || issue);
    });
}

exports.get = get;
exports.getAll = getAll;
