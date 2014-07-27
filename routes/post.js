var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http');
var path = require('path');
var marked = require('marked');
var githubIssues = require('../lib/githubissues');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

router.get('/:id', function(req, res) {
    githubIssues.get(req.params.id, function(issue) {
        issue.md = marked;
        res.render('post', issue);
    });
});

module.exports = router;
