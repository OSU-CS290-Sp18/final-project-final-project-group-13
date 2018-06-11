(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['404'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<body>\n  <header class=\"404-heading\">\n    <h1 class=\"404-text\">\n      Error 404\n    </h1>\n    <p class=\"404-explanation\">\n      You've either got the wrong page, or this page doesn't exist.\n    </p>\n  </header>\n</body>\n";
},"useData":true});
})();