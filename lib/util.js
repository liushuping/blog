var fs = require('fs');
var Handlebars = require('handlebars');

function template(srcFile) {
    var src = fs.readFileSync(srcFile, 'utf8');
    return Handlebars.compile(src);
}

exports.template = template;
