var user = process.argv[2],
    repo = process.argv[3],
    GitHubApi = require('github'),
    level = require('level'),

    issuesDB = level('../db/issues');

    github = new GitHubApi({
        version: '3.0.0',
        protocol: 'https',
    }),

    updateOption = {
	valueEncoding: 'json'
    },

    issueMsg = {
        user: user,
        repo: repo
    };

function updateAnIssue(issue) {
    console.log('update issue ', issue.number, ' :', issue.title);
    issuesDB.put(issue.number, issue, updateOption, function (err) {
	if (err) {
	    console.log(err);
	}
    });
}

function processIssues(issues) {
    var i, len;
    for (i = 0, len = issues.length; i < len; i++) {
	updateAnIssue(issues[i]);
    }
}

github.issues.repoIssues(issueMsg, function(err, issues) {
    if (err) {
        console.log(err);
    } else {
	processIssues(issues);	
    }
});
