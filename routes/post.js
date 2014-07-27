var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http');
//var level = require('level');
var path = require('path');
//var issuesDB = level(path.join(__dirname, '../db/issues'));

router.get('/:id', function(req, res) {
    res.end(req.params.id);
});

//router.get('/', function(req, res) {
//    readAllIssues(function(issues)  {
//        res.render('index', { issues: issues });
//    });
//});

module.exports = router;
