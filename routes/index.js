var express = require('express');
var router = express.Router();
var http = require('http');
var level = require('level');
var path = require('path');
var githubIssues = require('../lib/githubissues');

router.get('/', function(req, res) {
    githubIssues.getAll(function(issues)  {
        res.render('index', { issues: issues });
    });
});

module.exports = router;
