var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");  //select form
var tasksToDoEl = document.querySelector("#tasks-to-do");  //select ul or list in page content

var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name'").value;   //get the value from the Entered input 
  var taskTypeInput = document.querySelector("select[name='task-type']").value;  //get the value from the Selected input

  // check if inputs are empty (validate)
  if (taskNameInput === "" || taskTypeInput === "") {     
    alert("You need to fill out the task form!");
    return false;
  }
  
  formEl.reset();   //\?????????????? No idea

  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  var taskDataObj = {             //The is an object
    name: taskNameInput,
    type: taskTypeInput
  };

  createTaskEl(taskDataObj);    //calls the function
};

var createTaskEl = function(taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";              //dynamically stylize it

  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id",taskIdCounter);        //custom data attribute and the data that goes into it next

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");     //Why create the div here????
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);   //Parent.appendChild(child)    So here we are creating a <Div> inside <li>

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // add list item to list
  tasksToDoEl.appendChild(listItemEl);  //Adding that <li> child to <ul> parent in the form

  //increase task counter for next unique id
  taskIdCounter++;
};

var createTaskActions = function(taskId){
  var actoinContainerEl = document.createElement("div");
  actoinContainerEl.className = "task-actions";

  //create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actoinContainerEl.appendChild(editButtonEl);

  //create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id",taskId);

  actoinContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-tast-id", taskId);

  actoinContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do","In Progress","Completed"];

  for(var i=0; i<statusChoices.length; i++){
    //create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actoinContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);  //What to listen to and when to execute it!
