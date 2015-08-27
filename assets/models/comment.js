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
