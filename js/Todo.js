var i = 0,
		todos = [];

function checkForExistingNotes(){
	var todo  = JSON.parse(localStorage.getItem("Todo"));
	if(todo){
		i = todo.length;
		return todo;
	};
}
// create Notes
function createNewNote(){
	todos = checkForExistingNotes();
	id = i;

	var title = document.forms.Todo.title.value,
		data =  document.forms.Todo.notes.value,
		timestamp = new Date();	

	
	todos.push({
		"id": id,
		"title": title,
		"data": data,
		"timestamp": timestamp,
		 "type": "Notes"
	});
	localStorage.setItem("Todo",JSON.stringify(todos));
	document.getElementById('notes').innerHTML +="<div><h3>"+todos[todos.length - 1].title + 
		"</h3><p>" + todos[todos.length - 1].data  + "<p>Created At " + todos[todos.length - 1].timestamp + "</p></div><br/>" 
}

// Get Notes
function getNotes(todos){
		todos = checkForExistingNotes();
		for(var key = 0; key < todos.length ; key++){
		document.getElementById('notes').innerHTML +="<div><h3>"+todos[key].title + 
		"</h3><p>" + todos[key].data + "</p> " + "<p>Created At " + todos[key].timestamp +"</p></div><br/>" 
	}
	
}
$( document ).ready(function() {
	getNotes();
});
