var routes = require('./routes/index');
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

    app.get('/:id', function(req, res){
        res.send('user ' + req.params.id);
    });
    app.use('/users', users);

    /// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
}

exports.config = config;
