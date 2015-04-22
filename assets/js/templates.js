var templates = [];

templates.todolist = [

].join("");

templates.todoitem = [
  "<span class='typcn typcn-tick-outline'></span>",
  "<input type='text' class='todoitem-input' name='itemname' value='<%= name %>' disabled>",
  "<span class='typcn typcn-times-outline'></span> <span class='typcn typcn-pin-outline'></span>"
].join("");
