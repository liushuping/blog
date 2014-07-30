var express = require('express');
var router = express.Router();
var params = require('express-params');
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

params.extend(router);

router.param('id', /^\d+$/);
router.param('slug', /^.*$/);

router.get('/:id', handler);
router.get('/:id/:slug', handler);

function handler(req, res, next) {
    githubIssues.get(req.params.id, function(issue) {
        if (issue.number == undefined) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
            return;
        }

        var slug = issue.title.replace(/\s+/g, '-');
        if (req.params.slug != slug) {
            var url = '/' + req.params.id + '/' + slug;
            res.redirect(url);
        } else {
            issue.md = marked;
            res.render('post', issue);
        }
    });
};

module.exports = router;
