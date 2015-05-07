//
//
//VIEWS
//
//



///////////////////////////////////////
///////To-Do List Item view
///////////////////////////////////////
var ToDoItemView = Backbone.View.extend({
  //template: _.template(templates.todoitem),
  tpl: $('#todoItemTemplate').html(),
  tagName: 'article',
  className: 'todo-item',

  initialize: function(){
    console.log('todo item view init');                        //Compile template from the HTML string
    this.compiledTpl = dust.compile(this.tpl, 'todoItemTpl');
    //Register the template in Dust
    dust.loadSource(this.compiledTpl);

    //Forces a re-render on model change
    this.model.bind('change', _.bind(this.render, this));
  },

  events: {

    //Double-click to enable edit
    "dblclick input" : "enableEdit",

    //Edit item
    "keyup .todoitem-input" : "editItem",

    //Delete item - Mark complete
    "click .typcn-tick-outline" : "completeItem",
    "click .typcn-media-record-outline" : "completeItem",
    "click .typcn-times-outline" : "deleteItem",

    //Highlight item
    "click .typcn-pin-outline" : "highlightItem"
  },



  render: function (){
    // var compiled = this.template(this.model.toJSON());
    // this.$el.html(compiled);

    //USING DUST.js, rendering and compiling templates client side

    //// compiles, loads, and renders
    // dust.renderSource(src, { world: "Alpha Centauri" }, function(err, out) { ... });

    var data = this.model.toJSON();
    var _self = this;
    dust.render('todoItemTpl', data, function(err, out) {
    // place the HTML into the target DIV
      _self.$el.html(out);
    });
    return this;
  },

  enableEdit: function(e){
    this.$el.find('input').prop("disabled", false).focus();
  },

  editItem: function(e){
    if(e.keyCode == 13){
      var editedItem = {
        name: this.$el.find('input').val(),
        lastEdited: Date.now()
      };
      this.model.set(editedItem);
      this.model.save();
      this.$el.find('input').prop("disabled", true);
    }
  },

  completeItem: function(e){
    var editedItem = {};
    if(this.model.attributes.complete){
      editedItem = {
        complete: false
      };
    }
    else {
      editedItem = {
        complete: true
      };
    }
    this.model.set(editedItem);
    this.model.save();
    this.render();
  },

  highlightItem: function(e){
    var editedItem = {};
    if(this.model.attributes.important){
      editedItem = {
        important: false
      };
    }
    else {
      editedItem = {
        important: true
      };
    }
    this.model.set(editedItem);
    this.model.save();
    this.render();
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
    console.log('todo list view init');
    this.addAllToDoItems();
  },

  events: {

    //Add Items
    "click #createItem" : "createToDoItem",
    "keyup input.newToDo" : "enterToDoItem",

    //Complete all and //Uncomplete all
    "click #completeAll" : "completeAllItems"

    //Clear completed

    //Show all/completed/incomplete

    // ?? Delete list??
  },

  enterToDoItem: function(e){
    if(e.keyCode == 13){
      this.createToDoItem(e);
    }
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
    var itemToAdd = new ToDoItemModel(newToDoItem);
    //Then saves this new model (ajax POST)
    itemToAdd.save();

    //Adds this item to the To Do list as a whole (the collection)
    this.collection.add(itemToAdd);
    //Renders the new to-do item to the to-do list
    this.addNewItem(itemToAdd);

    //Clears out input so that you can input a new to-do item
    this.$el.find('input[name="newToDoItem"]').val('');
  },

  completeAllItems: function(e){
    e.preventDefault();
    _.each(this.collection.models, function (item, idx, arr) {
      item.attributes.complete = true ;
      item.save();
    });
  },

  addToDoItem: function(item){
    var itemView = new ToDoItemView({ model:item });
    this.$el.append(itemView.render().el);
  },

  addNewItem: function(item){
    var itemView = new ToDoItemView({ model : item });
    this.$el.after(itemView.render().el);
  },

  addAllToDoItems: function(){
    _.each(_.sortBy(this.collection.models, 'dateCreated'), this.addToDoItem, this);
  }

});
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
