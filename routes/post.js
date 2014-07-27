var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http');
var path = require('path');
var markdown = require('markdown').markdown;
var githubIssues = require('../lib/githubissues');

router.get('/:id', function(req, res) {
    githubIssues.get(req.params.id, function(issue) {
//        var body = markdown.toHTML(issue.body);
//        var post = {
//            title: issue.title,
//            body: body
//        };
        
        issue.md = markdown.toHTML;
        res.render('post', issue);
    });
});

module.exports = router;
