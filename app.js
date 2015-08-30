var AppTemplates = {};

AppTemplates['app'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "\n<div class=\"comments\"></div>\n\n<button class=\"add\">Add New Comment</button>\n\n<form class=\"form\">\n    Name: <input type=\"text\" class=\"name\">\n    E-Mail: <input type=\"text\" class=\"email\">\n    Content: <input type=\"text\" class=\"content\">\n    <button class=\"submit\">Submit Comment</button>\n</form>\n";
},"useData":true});
AppTemplates['comment'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"view-comments\">\n    <ul>\n        <li>\n            <a href=\""
    + alias3(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"email","hash":{},"data":data}) : helper)))
    + "\">\n            "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n            </a><br>\n            "
    + alias3(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper)))
    + "\n        </li>\n    </ul>\n</div>\n";
},"useData":true});
var Comment = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    name: '',
    email: '',
    content: '',
    done: false
  }
});

var CommentList = Backbone.Collection.extend({
  model: Comment,

  //to sync with a server, add url to collection
  url: 'http://tiny-lr.herokuapp.com/collections/jc-comments'
});

 var CommentView = Backbone.View.extend({
  tagName: 'li',
  template: AppTemplates.comment,

  initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

  render: function() {
      var html = this.template(this.model.toJSON());
      this.$el.html(html);
      return this;
    }
});

//

var AppView = Backbone.View.extend({
  template: AppTemplates.app,

  el: '.comments',

  initialize: function() {
    this.listenTo(this.collection, 'add reset sync', this.render);

    this.render();
    this.collection.fetch();
  },

  events: {
      'submit form': 'submitNew',
      'click .add': 'addNew'
    },

  render: function() {
    var html = this.template(this.collection);
    var _this = this;

    this.$el.html(html);
    this.collection.forEach(function(comment) {
      var childView = new CommentView({model: comment});

      _this.$el.find('.comments').append(childView.render().$el);
    });

    console.info('render');
    return this;
  },

  addNew: function() {
    this.$el.find('.form').slideDown();
  },

  submitNew: function(ev) {
    ev.preventDefault();

    var name = this.$el.find('input.name').val();
    var email = this.$el.find('input.email').val();
    var content = this.$el.find('input.content').val();
    this.collection.create({name: name, email: email, content: content});
  }

});

var comments = new CommentList();
var app = new AppView({collection: comments});
//# sourceMappingURL=app.map