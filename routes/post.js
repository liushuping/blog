var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http');
var path = require('path');
var githubIssues = require('../lib/githubissues');

router.get('/:id', function(req, res) {
    githubIssues.get(req.params.id, function(issue) {
        res.render('post', {issue: issue});
    });
});

module.exports = router;
