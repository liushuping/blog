var level = require('level');
var marked = require('marked');
var postsDB = level('../db/posts');
var leveldown = require('leveldown');
var postConfig = require('../posts/post-config');
var updateOption = {
        valueEncoding: 'json'
    };
    
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

function destroyDB(callback) {
    leveldown.destroy('../db/posts', function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('../db/posts is destroyed');
            (callback instanceof Function) && callback();
        }
    });
}

function updateAnPost(post) {
    fetchAPost(post.path, function(body) {
        console.log('update post ', post.id, ' :', issue.slug);
        post.body = body;
        postsDB.put(post.id, post, updateOption, function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
}

function fetchAPost(url, callback) {
    callback && callback(body);
}

postConfig.publishes.forEach(updateAnPost);
