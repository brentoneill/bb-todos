$(function(){

  //Creates a new To Do List (collection) object
  var todolistCollection = new ToDoListCollection();

  //Fetches the persisted data and populates the collection with it
  //Then, creates a view based on that fetched data
  todolistCollection.fetch().then(function () {
    var appView = new ToDoListView({ collection: todolistCollection });
  });

});
