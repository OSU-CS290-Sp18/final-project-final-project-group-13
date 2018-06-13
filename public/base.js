(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['base'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "﻿<!DOCTYPE html>\r\n<html>\r\n	<head>\r\n		<meta charset=\"utf-8\">\r\n		<title>Index</title>\r\n		<script src=\"//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.3.0/handlebars.min.js\"></script>\r\n		<link rel=\"stylesheet\" href=\"/style.css\" media=\"screen\">\r\n	</head>\r\n\r\n		<header>\r\n			<h1 class=\"page-title\">\r\n				Hello welcome to our message board!\r\n			</h1>\r\n\r\n		  <button class=\"create-post-b\"> + </button>\r\n		</header>\r\n\r\n    "
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n\r\n	<div class=\"post-box\">\r\n\r\n	</div>\r\n</html>\r\n";
},"useData":true});
})();