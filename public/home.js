(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.post,depth0,{"name":"post","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<main class=\"post-layout\">\r\n\r\n	<div class=\"post-container\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.posts : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\r\n\r\n</main>\r\n\r\n\r\n\r\n<div id=\"post-modal-backdrop\" class=\"hidden\"></div>\r\n	<div id=\"post-modal\" class=\"hidden\">\r\n		<div class=\"post-modal-dialog\">\r\n\r\n			<div class=\"post-modal-header\">\r\n				<h3>Add a Post</h3>\r\n				<button type=\"button\" class =\"post-modal-hide\">&times;</button>\r\n			</div>\r\n\r\n\r\n			<div class=\"post-modal-body\">\r\n\r\n				<div class=\"post-input-element\">\r\n					<label for=\"post-title-input\">Post Title</label>\r\n					<input type=\"text\" id=\"post-title-input\">\r\n				</div>\r\n\r\n				<div class=\"post-input-element\">\r\n					<label for=\"post-auth-input\">Username</label>\r\n					<input type=\"text\" id=\"post-auth-input\">\r\n				</div>\r\n\r\n				<div class=\"post-input-element\">\r\n					<label for=\"post-text-input\">Content</label>\r\n					<input type=\"text\" id=\"post-text-input\">\r\n				</div>\r\n			</div>\r\n\r\n				<div class = \"post-modal-footer\">\r\n					<button type =\"button\" id=\"post-modal-cancel\" class =\"post-modal-hide action-button\">Cancel</button>\r\n					<button type=\"button\" id=\"post-modal-accept\" class=\"action-button\">Add Post</button>\r\n				</div>\r\n\r\n		</div>\r\n	</div>\r\n";
},"usePartial":true,"useData":true});
})();