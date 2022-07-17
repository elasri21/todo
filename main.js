// add task button
const form = document.forms[0];

//content where tasks are shown
const contentContainer = document.querySelector(".content");


//function that creates tasks
function createTask(text) {
    //create task container
    let task = document.createElement("div");
    task.setAttribute("class", "task");

    //create task Name container
    let taskName = document.createElement("div");
    taskName.setAttribute("class", "task-name");

    //create task Name
    let name = document.createElement("p");
    name.setAttribute("class", "text");

    //append childen
    task.appendChild(taskName);
    taskName.appendChild(name);


    //create btns container
    let btnContainer = document.createElement("div");
    btnContainer.setAttribute("class", "dealing-with");
    
    //create edit task button and its value
    let editTask = document.createElement("button");
    editTask.setAttribute("class", "edit-task");
    let editVal = document.createTextNode("edit task");
    editTask.appendChild(editVal);
    
    //create delete task button
    let deleteTask = document.createElement("button");
    deleteTask.setAttribute("class", "delete-task");
    let delVal = document.createTextNode("delete task");
    deleteTask.appendChild(delVal);

    // append children
    btnContainer.appendChild(editTask);
    btnContainer.appendChild(deleteTask);

    // append to the content container
    task.appendChild(btnContainer);
    contentContainer.appendChild(task);

    // add the task name to its parent
    name.appendChild(document.createTextNode(text));

    // edit the task: change its name
    editTask.addEventListener("click", function() {
        let test = prompt("Edit the task: ", name.textContent);
        name.textContent = test;
    })


    // remove tasks
    deleteTask.addEventListener("click", function (e) {
        if(confirm("Are you sure?")) {
            this.closest(".task").remove();
        }
});

}

// add task when the form is submitted
form.addEventListener("submit", function(e) {
    e.preventDefault();
    let field = this.elements.task;
    if(field.value === "") {
        alert("Task's name is required");
    } else {
        createTask(field.value);
        field.value = "";
        field.focus();
    }
});

