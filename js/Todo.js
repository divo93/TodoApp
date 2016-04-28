var i = 0,
		todos = [],
		trash = [];

function checkForExistingNotes(){
	var todo  = JSON.parse(localStorage.getItem("Todo"));
	if(todo){
		i = todo.length;
		todos = todo;
	};
}
// create Notes
function createNewNote(){
	checkForExistingNotes();
	id = i;

	var title = document.forms.Todo.title.value,
		data =  document.forms.Todo.notes.value,
		timestamp = new Date().toDateString();	

	
	todos.push({
		"id": id,
		"title": title,
		"data": data,
		"timestamp": timestamp,
		 "type": "Notes"
	});
	localStorage.setItem("Todo",JSON.stringify(todos));
	document.getElementById('title').value = "";
	document.getElementById('desc').value = "";
	document.getElementById('notes').innerHTML +="<div><h3>"+todos[todos.length - 1].title + "</h3><p>" + todos[todos.length - 1].data  + "<p>Created At " + todos[todos.length - 1].timestamp + "</p><input type='button' value='Delete' onclick='removeNotes(" + todos[todos.length - 1].id +")'/></div>";
}

// Get Notes
function getNotes(){
	document.getElementById('notes').innerHTML = "";
		var todo  = JSON.parse(localStorage.getItem("Todo"));
		if(todo !== null ){
		i = todo.length;
		todos = todo;
		for(var key = 0; key < todos.length ; key++){
		document.getElementById('notes').innerHTML +="<div><h3>"+todos[key].title + "</h3><p>" + todos[key].data  + "<p>Created At " + todos[key].timestamp + "</p><input type='button' value='Delete' onclick='removeNotes(" + key +")'/></div>";
		}
		
	}
	
}

// Remove Notes
function removeNotes(id){
	var todo  = JSON.parse(localStorage.getItem("Todo"));
	var trashedItem = todo.splice(id,1)
	for(var i=0; i< trashedItem.length; i++)
		trash.push(trashedItem[i]);
	localStorage.setItem("Todo",JSON.stringify(todo));
	localStorage.setItem("Trash", JSON.stringify(trash));
	getNotes()
	if(!todo.length){
		localStorage.removeItem("Todo");
	}
}

$( document ).ready(function() {
	getNotes();
});
