
var trash_key = 0,
	todo_key = 0,
	list_key = 0,
 	todos = new Array,
 	trash =  new Array,
 	list = new Array;

/* 
	checking for existing notes and return the todo if exists, 
	meanwhile it add id as the total length of todo.
*/
function checkForExistingTodos(){
	todo_str = JSON.parse(localStorage.getItem("Todo"));
	if(todo_str){
		todo_key = todo_str.length;
		todos = todo_str;
	}
	return todos;
}

/* 
	adding notes, first it checks for existing notes if any, and then adds the data into todo.
*/
function addNotes(){
	todos = checkForExistingTodos();
	var note = document.getElementById("note").value;
	var timestamp = new Date().toDateString();
	if(note == "")
		note = "Todo Note";
	todos.push({
		"id": todo_key,
		"note" : note,
		"timestamp":timestamp,
		"type":"todo"
	});
	localStorage.setItem("Todo", JSON.stringify(todos));
	document.getElementById("note").value = "";
	document.getElementById('notes_space').innerHTML += "<div><p>" +todos[todo_key].note + "</p>Edited" + todos[todo_key].timestamp + 
	"<input type='button' value='Delete' onclick='removeNotes("+ todo_key + ")' /><input type='button' value='Edit' id = 'edit' onclick= 'editNotes(" + todo_key + ")' /></div>" 
}

function editNotes(key){
	var value = "";
	todos = checkForExistingTodos();
	for(var i=0;i<todos.length;i++){
		if(key == todos[key].id){
			value = prompt("Edit the Existing Value");
			break;
		}
	}
	if(value){
		todos[key].note = value;
		todos[key].timestamp = new Date().toDateString();
		localStorage.setItem("Todo",JSON.stringify(todos));
	}
	showTodos();
}

function showTodos(){
	
	document.getElementById('notes_space').innerHTML = "";
	todos = checkForExistingTodos();
	console.log("todos ", todos)
	for(var key = 0; key < todos.length; key++)
	document.getElementById('notes_space').innerHTML += "<div><p>" +todos[key].note + "</p>Edited" + todos[key].timestamp + 
		"<input type='button' value='Delete' onclick='removeNotes("+ key + ")' /><input type='button' value='Edit' id = 'edit' onclick='editNotes(" + key + ")' /></div>" 
}

/*	
	before adding notes into trash it checks for existing trashed notes and add the deleted note at the end of the array.
	meanwhile it adds key with each trash item.
*/
function checkForExistingTrash(){
	var trash_str = JSON.parse(localStorage.getItem("Trash"))
	if(trash_str){
		trash_key = trash_str.length
		trash = trash_str
	}
	return trash
}

/*	
	remove notes on click of delete button in todo.
	set removed data into Trash and the rest after the removal is updated into Todo.
*/
function removeNotes(key){
	var todos = JSON.parse(localStorage.getItem("Todo"))
	var trashed_value = todos.splice(key,1)
	trash = checkForExistingTrash()
	trash.push({"id":trash_key,"notes":trashed_value})
	localStorage.setItem("Trash",JSON.stringify(trash))
	localStorage.setItem("Todo", JSON.stringify(todos));
	showTodos();
	if(!todos.length){
		localStorage.removeItem("Todo");
	}
}

/*	
	undo notes on click of undo button in trash.
	set undo data into Todo again and the rest after the undo is updated into Trash.
*/
function undoTrash(key){
  var trash = JSON.parse(localStorage.getItem("Trash"))
  var untrashed_value = trash.splice(key,1);
  todo = checkForExistingTodos();
  todo.push(untrashed_value[0].notes[0]);
  localStorage.setItem("Trash", JSON.stringify(trash))
  localStorage.setItem("Todo", JSON.stringify(todo));
  showTrash();
  if(!trash.length){
  	localStorage.removeItem("Trash")
  }
}

/*	
	show todos clear data on the page and reload todo data
*/


/*	
	show trash clear data on the page and reload trash data
*/
function showTrash(){
	// to clear data on the page and reload todo data...
	document.getElementById('trash_space').innerHTML = "";
	trash = checkForExistingTrash();
	for(var key = 0; key < trash.length; key++)
	document.getElementById('trash_space').innerHTML += "<div><p>" +trash[key].notes[0].note + "</p>Edited" + trash[key].notes[0].timestamp + "<input type='button' value='undo' onclick='undoTrash("+ key + ")' /></div>" 
}

/* 
	adding list, first it checks for existing list if any, and then adds the data into list.
*/
function checkForExistingList(){
	list_str = JSON.parse(localStorage.getItem("List"));
	if(list_str){
		list_key = list_str.length
		list = list_str
	}
	return list
} 

/* 
	adding data into list
*/
function addList(){
	list = checkForExistingList();
	var note = document.getElementById("list_note").value;
	var timestamp = new Date().toDateString();
	if(note == "")
		note = "Todo List"
	list.push({
		"id": list_key,
		"note" : note,
		"timestamp":timestamp,
		"type":"todo_list"
	})
	localStorage.setItem("List", JSON.stringify(list));
	document.getElementById("list_note").value = "";
	document.getElementById("list_space").innerHTML += "<div><p><input type='checkbox' value='" + list[list.length-1].id + "' onchange='checkedList(this)'/>" + list[list.length-1].note + "<input type='button' value='Delete' /></p></div>"
}

/* 
	check out if the list is done.
*/
function checkedList(element)
{	var parentDiv = element.parentElement.parentElement;
	parentDiv.style.display = 'None';
	list = checkForExistingList();
	for(var i=0; i<list.length; i++){
		if (list[i].id == element.value){
			if (element.checked)
			document.getElementById("done_task").innerHTML += "<div>"+ list[i].note + "<input type='button' value='Delete' onclick='removeNotes("+ element.value + ")' /></div>";
			list.splice(list[i].id,1);
			console.log("list ", list)
			localStorage.setItem("List", JSON.stringify(list))
			break;
		}
	}
}


function showList(){
	
	document.getElementById('notes_space').innerHTML = "";
	list = checkForExistingList();
	console.log("list ", list)
	for(var key = 0; key < list.length; key++)
	document.getElementById("list_space").innerHTML += "<div><p><input type='checkbox'/>"+ list[key].note + "<input type='button' value='delete'/></p></div>"
}