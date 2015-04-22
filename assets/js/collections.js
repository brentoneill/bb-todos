var ToDoListCollection = Backbone.Collection.extend({
  url: 'http://tiy-fee-rest.herokuapp.com/collections/bobbtodos',
  model: ToDoItemModel
});
