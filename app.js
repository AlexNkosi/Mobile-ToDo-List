// selectors 
const spanDate = document.getElementById("Date");
const addBtn = document.querySelector("#addTaskBtn");
const todoInput = document.querySelector("#toDoInput");
const todoList = document.querySelector(".List");
const clear = document.querySelector(".clear");




testObj(clear);
//
let id = 0;
let List = [];
// event listners 
document.addEventListener('DOMContentLoaded', getDate);
document.addEventListener('DOMContentLoaded', getTodoList);

addBtn.addEventListener('click', getTaskToDo);
todoList.addEventListener("click", deleteCheck);
clear.addEventListener('click', () => {
        localStorage.clear();




        for (let i = 0; i < (todoList.childNodes.length - 1); i++) {
            //to insert the class-del-anime in all lists for clearing 
            todoList.children[i].classList.add("class-clear-Anime");
            todoList.children[i]
        }
        todoList.addEventListener('animationend', () => {

            location.reload();

        })

    })
    // testObj(list);

// functions 

function deleteCheck(e) {
    const item = e.target;



    if (item.classList[0] === "complete") {
        let index = item.getAttribute("id");
        const parent = item.parentElement;
        // console.log(parent, "found");
        // spantext.classList.toggle("task-complete");
        console.log(index);
        completeTask(parent, index);
    }

    if (item.classList[0] === "bin") {
        // console.log("del", parent.parentElement);
        let index = item.getAttribute("id");
        const parent = item.parentElement;
        parent.classList.add("class-del-Anime");
        removeTodoStorage(index);
        // 'transitionend'
        parent.addEventListener('animationend', () => {
            parent.parentElement.removeChild(parent);

        });


    }
}



function completeTask(elem, index) {

    elem.querySelector(".Task").classList.toggle("task-complete");
    List = JSON.parse(localStorage.getItem("Todo"));

    console.log(index, "COMPLETE");

    let searchedIndex = List.map((item) => item.id).indexOf(Number(index));
    console.log(searchedIndex, "COMPLETE");

    List[searchedIndex].done = (List[searchedIndex].done) ? false : true;

    // if (List[index].done === false) {
    //     List[index].done = true;
    //     // testObj("f");
    // } else if (List[index].done === true) {
    //     List[index].done = false;
    //     // testObj("t");

    // }

    // console.log(elem, index, List[Number(index)].done);
    localStorage.setItem("Todo", JSON.stringify(List));

}

function removeTodoStorage(index) {

    if (localStorage.getItem("Todo") === null) {
        List;
    } else {

        List = JSON.parse(localStorage.getItem("Todo"));
        // console.log("here")
    }
    // testObj(List[index], index, "x");

    let searchedIndex = List.map((item) => { return item.id; }).indexOf(Number(index));


    // console.log(searchedIndex.indexOf(Number(index)), index, searchedIndex);
    List.splice(searchedIndex, 1);

    // console.log(searchedIndex, );
    localStorage.setItem("Todo", JSON.stringify(List));



}

function getTodoList() {
    if (localStorage.getItem("Todo") == null) {
        List;
    } else {
        List = JSON.parse(localStorage.getItem("Todo"));
    }

    List.forEach(item => {
        addToDoItem(item.name, item.id, item.done)
    });
    // console.log(id);
    id = List.length;
    console.log(id);

    localStorage.setItem("Todo", JSON.stringify(List));
}

function getDate() {

    let options = { weekday: "long", day: "numeric", month: "short" };
    let today = new Date();

    spanDate.innerText = today.toLocaleDateString("en-SA", options);
    addToDoItem("Medidate", 100, false);
}

function getTaskToDo() {
    event.preventDefault();
    let task = todoInput.value.trim();
    if (task === "") {
        //return focus display error 
        todoInput.focus();
        todoInput.setAttribute("placeholder", "empty task");
        // todoInput.classList.toggle("class-error");
        todoInput.classList.add("class-error");
    } else {
        addToDoItem(task, id, false);

        List.push({
            id: id,
            name: task,
            done: false,
        });

        testObj(List);
        localStorage.setItem("Todo", JSON.stringify(List));
        todoInput.setAttribute("placeholder", "add a To-Do List");
        todoInput.classList.remove("class-error");

    }


    todoInput.value = "";
    id++;

}

function addToDoItem(todo, id, done) {

    let Line = done ? "task-complete" : "";
    let linkComplete = "./image/icons8_ok.ico";

    let linkDelete = "./image/icons8_filled_trash.ico";

    let item = `<li class="class-todo-List class-add" id=${id}>
    <img src="${linkComplete}" alt="complete button" id=${id} class="complete"/>
    
        <span id="Task" class="Task ${Line}">${todo}</span >  <img src="${linkDelete}" id=${id} alt= "delete button" class="bin" /></li>`;
    let position = "beforeend";
    todoList.insertAdjacentHTML(position, item);
    console.log(Line);



}

function testObj(obj) {
    console.log(obj);
}

// function getElementClick(event) {
//     let todo = event.target;

//     const spantext = document.getElementById("Task");
//     console.log(todo.classList);
//     if (todo.classList.value === "complete") {

//         spantext.classList.toggle("task-complete");
//     }

//     if (todo.classList[0] === "bin") {
//         let parent = todo.parentNode;
//         // parent.remove();
//         testObj("bin");
//         testObj(parent);
//     }
//     testObj(todo);

// }