(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['404'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<body>\r\n  <header class=\"404-heading\">\r\n    <h1 class=\"404-text\">\r\n      Error 404\r\n    </h1>\r\n    <p class=\"404-explanation\">\r\n      You've either got the wrong page, or this page doesn't exist.\r\n    </p>\r\n  </header>\r\n</body>\r\n";
},"useData":true});
})();