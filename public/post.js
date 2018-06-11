(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['post'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"post-frame\">\r\n  <p class=\"post-title\">\r\n    <a href=\"posts/"
    + alias4(((helper = (helper = helpers.postID || (depth0 != null ? depth0.postID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postID","hash":{},"data":data}) : helper)))
    + "\" class=\"post-location\">"
    + alias4(((helper = (helper = helpers.postTitle || (depth0 != null ? depth0.postTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postTitle","hash":{},"data":data}) : helper)))
    + "</a>\r\n  </p>\r\n  <p class=\"post-demo\">\r\n      "
    + alias4(((helper = (helper = helpers.postText || (depth0 != null ? depth0.postText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postText","hash":{},"data":data}) : helper)))
    + "\r\n  </p>\r\n  <p class=\"post-author\">\r\n    "
    + alias4(((helper = (helper = helpers.postAuthor || (depth0 != null ? depth0.postAuthor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postAuthor","hash":{},"data":data}) : helper)))
    + "\r\n  </p>\r\n</div>\r\n";
},"useData":true});
})();