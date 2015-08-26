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

  addNew: function(ev) {
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
