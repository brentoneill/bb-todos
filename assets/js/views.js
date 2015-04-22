//
//
//VIEWS
//
//



///////////////////////////////////////
///////To-Do List Item view
///////////////////////////////////////
var ToDoItemView = Backbone.View.extend({
  template: _.template(templates.todoitem),
  tagName: 'article',
  className: 'todo-item',

  initialize: function(){
  },

  events: {

    //Double-click to enable edit
    "dblclick input" : "enableEdit",

    //Edit item
    "keyup .todoitem-input" : "editItem",

    //Delete item - Mark complete
    "click .typcn-tick-outline" : "completeItem",
    "click .typcn-times-outline" : "deleteItem",

    //Highlight item
    "click .typcn-pin-outline" : "highlightItem"
  },

  render: function (){
    var compiled = this.template(this.model.toJSON());
    this.$el.html(compiled);
    return this;
  },

  enableEdit: function(e){
    this.$el.find('input').prop("disabled", false).focus();
  },

  editItem: function(e){
    if(e.keyCode == 13){
      var editedItem = {
        name: this.$el.find('input').val(),
      }
      this.model.set(editedItem)
      this.model.save();
      this.$el.find('input').prop("disabled", true);
    }
  },

  completeItem: function(e){
    var editedItem = {
      complete: true
    }
    this.model.set(editedItem)
    this.model.save();
  },

  highlightItem: function(e){
    var editedItem = {
      important: true
    }
    this.model.set(editedItem)
    this.model.save();
  },

  deleteItem: function(e){
    console.log('deleting item');
    this.model.destroy();
    this.$el.remove();
  },




});
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////



///////////////////////////////////////
///////To-Do List View (App view)
///////////////////////////////////////
var ToDoListView = Backbone.View.extend({
  el: $('section.todo-list'),

  initialize:function(){
    console.log('to-do list view init');
    this.addAllToDoItems();
  },

  events: {

    //Add Items
    "click #createItem" : "createToDoItem"

    //Complete all

    //Uncomplete all

    //Clear completed

    //Show all/completed/incomplete

    // ?? Delete list??
  },

  createToDoItem: function(e){
    e.preventDefault();

    //Creates the new to do list item with some default values and its name from the input
    var newToDoItem = {
      name: $('section.todo-list').find('input[name="newToDoItem"]').val(),
      dateCreated: Date.now(),
      complete: false,
      important: false
    };

    //Creates a new ToDoItemModel w/ the above object as the data
    var newToDoItem = new ToDoItemModel(newToDoItem);
    //Then saves this new model (ajax POST)
    newToDoItem.save();

    //Adds this item to the To Do list as a whole (the collection)
    this.collection.add(newToDoItem);
    //Renders the new to-do item to the to-do list
    this.addToDoItem(newToDoItem);

    //Clears out input so that you can input a new to do item
    this.$el.find('input[name="newToDoItem"]').val('');
  },

  addToDoItem: function(item){
    var itemView = new ToDoItemView({ model:item })
    this.$el.append(itemView.render().el);
  },

  addAllToDoItems: function(){
    var sorted = _.sortBy()
    _.each(_.sortBy(this.collection.models, 'dateCreated'), this.addToDoItem, this)
  }

});
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
