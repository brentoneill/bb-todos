///////////////////////////////////////
///////To-Do ITEM Model
///////////////////////////////////////
var ToDoItemModel = Backbone.Model.extend({
  urlRoot: 'http://tiy-fee-rest.herokuapp.com/collections/bobbtodos',
  idAttribute: "_id",

  defaults: function(){
    return {
      //Set defaults for items like:
      // complete: false
      // important: false
    };
  },

  initialize: function(){
      //Run some stuff when the model is created
  }

});
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
