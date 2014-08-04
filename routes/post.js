var express = require('express');
var router = express.Router();
var params = require('express-params');
var githubIssues = require('../lib/githubissues');

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
	var keywords_arr = issue.labels.map(function(keyword) {
	    return keyword.name;
	});

	issue.description = issue.title + '-刘淑平的Blog';
	issue.keywords = keywords_arr.join(',');
	issue.updated_at = extractDate(issue.updated_at);

        var url = '/' + req.params.id + '/' + slug;
	issue.canonical = 'http://blog.liushuping.com' + url;

        if (req.params.slug != slug) {
            res.redirect(url);
        } else {
            res.render('post', issue);
        }
    });
};

function extractDate(timeStr) {
    var pattern = /^\d{4}-\d{2}-\d{2}/;
    var matches = pattern.exec(timeStr);
    return matches[0];
}

module.exports = router;
