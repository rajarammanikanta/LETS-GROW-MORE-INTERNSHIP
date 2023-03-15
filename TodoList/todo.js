let itemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveButton = document.getElementById("savebutton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}


let todolist = getTodoListFromLocalStorage();
saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todolist));
}

let lenghtlist = todolist.length;

function onclickstatus(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    console.log(checkboxElement.checked);
    let labelbox = document.getElementById(labelId);
    labelbox.classList.toggle("checked");
    let todoObjectIndex = todolist.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = todolist[todoObjectIndex];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }


}

function onDeleteTodo(todoId) {
    let createli = document.getElementById(todoId);
    itemsContainer.removeChild(createli);
    let deleteElementIndex = todolist.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todolist.splice(deleteElementIndex, 1);


}

function addon(todo) {
    let todoId = "todo" + todo.uniqueNO;

    let checkboxId = "checkbox" + todo.uniqueNO;
    let labelId = "label" + todo.uniqueNO;


    let createli = document.createElement("li");
    createli.classList.add("todo-item-container", "d-flex", "flex-row");
    createli.id = todoId;
    itemsContainer.appendChild(createli);




    let inputElement = document.createElement("input");
    inputElement.classList.add("checkbox-input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.onclick = function() {
        onclickstatus(checkboxId, labelId, todoId);
    }
    createli.appendChild(inputElement);



    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    createli.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    labelElement.textContent = todo.list;
    labelContainer.appendChild(labelElement);

    let iconContainer = document.createElement("div");
    iconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(iconContainer);

    let iconElement = document.createElement("i");
    iconElement.classList.add("far", "fa-trash-alt", "delete-icon");

    iconElement.onclick = function() {
        onDeleteTodo(todoId);
    };
    iconContainer.appendChild(iconElement);


}

for (let todo of todolist) {
    addon(todo);
}

function addTodo() {
    let getinput = document.getElementById("todoUserInput");
    let userinput = getinput.value;
    if (userinput === "") {
        alert("Enter valid input");
        return;
    }

    lenghtlist = lenghtlist + 1;
    let newTodo = {
        list: userinput,
        uniqueNo: lenghtlist,
    }

    todolist.push(newTodo);
    addon(newTodo);
    getinput.value = "";



}
addTodoButton.onclick = function() {
    addTodo();

}