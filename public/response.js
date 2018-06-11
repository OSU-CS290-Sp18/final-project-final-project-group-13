(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['response'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"response-frame\">\r\n  <p class=\"response-author\">\r\n    "
    + alias4(((helper = (helper = helpers.responseAuthor || (depth0 != null ? depth0.responseAuthor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"responseAuthor","hash":{},"data":data}) : helper)))
    + "\r\n  </p>\r\n  <p class=\"response-text\">\r\n    "
    + alias4(((helper = (helper = helpers.responseText || (depth0 != null ? depth0.responseText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"responseText","hash":{},"data":data}) : helper)))
    + "\r\n  </p>\r\n</div>\r\n";
},"useData":true});
})();