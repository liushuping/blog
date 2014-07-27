var routes = require('./routes/index');
var post = require('./routes/post');
var users = require('./routes/users');

function config(app) {
    app.param(function(name, fn){
        if (fn instanceof RegExp) {
            return function(req, res, next, val){
                var captures;
                if (captures = fn.exec(String(val))) {
                    req.params[name] = captures;
                    next();
                } else {
                    next('route');
                }
            }
        }
    });

    app.use('/', routes);

    app.param('id', /^\d+$/);

    app.get('/:id', post);

    /// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
}

exports.config = config;
