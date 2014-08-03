var express = require('express');
var router = express.Router();
var githubIssues = require('../lib/githubissues');

router.get('/', function(req, res) {
    githubIssues.getAll(function(issues)  {
        var title = '高阶是对抽象的抽象';
        
        res.render('index', { issues: issues, title: title });
    });
});

module.exports = router;
