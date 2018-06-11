(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['postPage'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.response,depth0,{"name":"response","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "﻿<body>\r\n	<header class=\"post-heading\">\r\n		<h1 class=\"page-post\">\r\n			"
    + alias4(((helper = (helper = helpers.postTitle || (depth0 != null ? depth0.postTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postTitle","hash":{},"data":data}) : helper)))
    + "\r\n		</h1>\r\n		<h2 class=\"page-post\">\r\n			"
    + alias4(((helper = (helper = helpers.postText || (depth0 != null ? depth0.postText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postText","hash":{},"data":data}) : helper)))
    + "\r\n		</h2>\r\n        <h4 class=\"page-author\">\r\n            "
    + alias4(((helper = (helper = helpers.postAuthor || (depth0 != null ? depth0.postAuthor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postAuthor","hash":{},"data":data}) : helper)))
    + "\r\n        </h4>\r\n	</header>\r\n\r\n    <main class=\"post-responses\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.responses : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</main>\r\n</body>\r\n\r\n";
},"usePartial":true,"useData":true});
})();