var show = document.getElementById("ShowYourLocation");
show.innerHTML = '';

var todo = document.getElementById("todo");


var todoshow = document.getElementById("ToDoList");
var progress = document.getElementById("Progress");
var done = document.getElementById("Done");

if(localStorage.getItem("list") != null){
    todolist = JSON.parse(localStorage.getItem("list"));
}

var todolist = [];

function GetCurrentLocation(){
   
    window.navigator.geolocation.getCurrentPosition(function(position){

        console.log(position.coords.altitude);
        console.log(position.coords.longitude);
    })
}



function AddToDo(){
    var list = {
       Name : todo.value
    }
    todolist.push(list);
    localStorage.setItem("list", JSON.stringify(todolist));
    console.log(JSON.parse(localStorage.getItem("list")));
    ShowToDoList();
    clear();
}

function clear(){
    todo.value="";
}
function ClearList(){
    localStorage.removeItem("list");
    ClearDone();
    ClearProgress();
    ClearToDo();
}

function ClearToDo(){
    todoshow.innerHTML = '';
}

function ClearProgress(){
    progress.innerHTML = '';
}

function ClearDone(){
    done.innerHTML = '';
}

function ShowToDoList(){
    todoshow.innerHTML += `<div
                                id="${todolist.length-1}"
                                draggable="true"
                                ondragstart="drag(event)"> 
                                ${todolist[todolist.length-1].Name} 
                           </div>`; 
}

function drag(event){
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let id = event.dataTransfer.getData("text");
    let draggedElement = document.getElementById(id); 
    event.target.appendChild(draggedElement);
  }

