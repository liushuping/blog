var express = require('express');
var router = express.Router();
var githubIssues = require('../lib/githubissues');
var sm = require('sitemap');
var sitemap;

githubIssues.getAll(function(issues)  {
    var title = '高阶是对抽象的抽象';
    
    var urls = issues.map(function(issue) {
	return {
	    url: '/' + issue.number
	}
    });
        
    sitemap = sm.createSitemap ({
        hostname: 'http://blog.liushupig.com',
        cacheTime: 600000,        // 600 sec - cache purge period
        urls: urls
    });
});


router.get('/sitemap.xml', function(req, res) {
  sitemap.toXML(function (xml) {
      res.header('Content-Type', 'application/xml');
      res.send(xml);
  });
});

module.exports = router;
