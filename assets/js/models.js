var ToDoItemModel = Backbone.Model.extend({
  urlRoot: 'http://tiy-fee-rest.herokuapp.com/collections/bobbtodos',
  idAttribute: "_id",

  defaults: function(){
    return {

    }
  },

  initialize: function(){

  }

});
