// date container
const dateContainer = document.querySelector(".date");
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let syntax = `${day} - ${month} - ${year}`;
dateContainer.textContent = syntax;
//console.log(syntax);

const items = {...localStorage};
let key = Object.keys(items);

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
        let old = this.closest(".name") ? this.closest(".name").textContent : name.textContent;
        let test = prompt("Edit the task: ", name.textContent);
        name.textContent = test;
        editStorage(old, test);
    });

    // add to local storage


    
    // remove tasks
    deleteTask.addEventListener("click", function (e) {
        if(confirm("Are you sure?")) {
            this.closest(".task").remove();
            remIt(name.textContent);
        }
});

}

// local
function localSt(value) {
    let  id = Math.floor(Math.random() * 10000);
    localStorage.setItem(`task-${id}`, value);
}
// add task when the form is submitted
form.addEventListener("submit", function(e) {
    e.preventDefault();
    let field = this.elements.task;
    if(field.value === "") {
        alert("Task's name is required");
    } else {
        createTask(field.value);
        localSt(field.value);
        field.value = "";
        field.focus();
    }
});


function remIt(item) {
    for(let i = 0; i < key.length; i++) {
        if(items[key[i]] == item) {
            localStorage.removeItem(key[i]);
        }
    }
}
function editStorage(val, item) {
    for(let i = 0; i < key.length; i++) {
        if(localStorage.getItem(key[i]) == val) {
            localStorage.setItem(key[i], item);
        }
    }
}

function showOldTasks() {
    key.forEach((k) => {
        createTask(items[k])
    });
}

window.addEventListener("load", showOldTasks);
