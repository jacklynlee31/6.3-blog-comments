var AppTemplates = {};

AppTemplates['app'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"full\">\n	<div class=\"area\">\n		<textarea>Join the discussion...</textarea>\n	</div>\n	<div class=\"button\">\n		<button>Comment</button>\n	</div>\n</div>\n";
},"useData":true});
AppTemplates['comments'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"above\">\n	<span>Text Goes Here</span>\n	<button>Comment</button>\n</div>\n";
},"useData":true});
var Comment = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    title: '',
    done: false
  }
});

var CommentList = Backbone.Collection.extend({
  model: Comment,

  //to sync with a server, add url to collection
  url: 'http://tiny-lr.herokuapp.com/collections/jc-comments'
});

var CommentView = Backbone.View.extend({
  // a view will create html off the page
  // what kind of element should I make?
  tagName: 'li',
  template: AppTemplates.app,

  //will be called when the view is first created
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  // events - things I want to listen for
  events: {
    'change .toggle': 'toggleDone',
    'click .destroy': 'burnItWithFire'
  },

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);
    this.$el.toggleClass('completed', this.model.get('done'));
    return this;
  },

  // model is all of the underlying data

  toggleDone: function() {
    this.model.set('done', !this.model.get('done'));
    this.model.save();
  },

  burnItWithFire: function() {
    var _this = this;
    this.$el.slideUp(function() {
      _this.model.destroy();
      _this.remove();
    });
  }
});

var AppView = Backbone.View.extend({
  template: AppTemplates.app,

  el: '.comments',

  initialize: function() {
    this.listenTo(this.collection, 'add reset sync', this.render);

    this.render();
    this.collection.fetch();
  },

  events: {
    'submit form': 'addComment',
    'change .toggle': 'markDone'
  },

  render: function() {
    var html = this.template(this.collection);
    var _this = this;

    this.$el.html(html);
    this.collection.sortBy('done').forEach(function(todo) {
      var childView = new CommentView({model: todo});

      _this.$el.find('.todo-list')
        .append(childView.render().$el);
    });

    console.info('render');

    this.$('.new-comment').focus();
    return this;
  },

  addTodo: function(ev) {
    ev.preventDefault();

    var title = this.$el.find('input').val();
    this.collection.create({title: title});
    this.$el.find('input').val('');
  }

});

var comments = new CommentList();
var app = new AppView({collection: comments});
//# sourceMappingURL=app.map