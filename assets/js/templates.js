var isComplete = function(complete){
  if(complete){
    return "complete";
  }
}

var isImportant = function(important){
  if(important){
    return "important";
  }
}

var templates = [];

templates.todolist = [

].join("");

templates.todoitem = [
  "<div class='<% print(isComplete(complete)) %> <% print(isImportant(important)) %>'>",
    "<span class='typcn typcn-tick-outline'></span>",
    "<input type='text' class='todoitem-input' name='itemname' value='<%= name %>' disabled>",
    "<span class='typcn typcn-times-outline'></span> <span class='typcn typcn-pin-outline'></span>",
  "</div>"
].join("");
