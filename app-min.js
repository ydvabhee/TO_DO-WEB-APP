let todoHeader = document.querySelectorAll(".TODOheader");
let todoContent = document.getElementById("content");
let todolist = document.getElementById("list");
let hisList = document.getElementById("Hislist");
let inputTXT = document.getElementById("input");
let submitBtn = document.querySelectorAll(".submitBtn");
const dateP = document.getElementById("dateP");


const loadList = (list) => {
  list.forEach((element) => {
    addTodo(element);
  });
};
let list;
let id;

//add date
const today = new Date();
const option = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
dateP.innerText = today.toLocaleDateString("en-US", option);

// get data from local storage
let data = localStorage.getItem("todoList");
if (data) {
  list = JSON.parse(data);
  id = list.length;
  loadList(list);
} else {
  list = [];
  id = 0;
}

document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) addtodoinlist();
});

function addtodoinlist() {
  let text1 = inputTXT.value.toLowerCase();
  inputTXT.value = "";
  if (text1 == "") return;
  list.push({
    todoName: text1,
    id: id,
    complete: false,
    trash: false,
    date: today.toLocaleDateString("en-US", option)
  });
  console.log(id);
  addTodo(list[id]);
  id++;
  localStorage.setItem("todoList", JSON.stringify(list));
}

function addTodo({
  todoName,
  id,
  complete,
  trash
}) {
  if (trash) return;
  let classname = complete ? "far fa-check-circle" : "far fa-circle";
  let job = complete ? "done" : "undone";
  let todoClass = complete ? "todo_title line_through" : "todo_title";
  let text = `<li>

      <i class=" ${classname} circle_big" id="${id}" job="${job}" action = "true"></i>
      <p class="${todoClass}" action = "false">${todoName}</p>
      <i  title="Delete" class="far fa-trash-alt trash_big" id="${id}" job="delete" action = "true"></i>
  </li>`;
  const position = "beforeend";
  todolist.insertAdjacentHTML(position, text);
}

todolist.addEventListener("click", function (event) {
  let targetElement = event.target;

  let action = targetElement.attributes.action.value;
  if (action == "true") {
    let elementId = parseInt(targetElement.attributes.id.value);
    let elementJob = targetElement.attributes.job.value;
    if (elementJob == "undone") {
      targetElement.parentNode.classList.toggle("flipX");
      setTimeout(function () {
        targetElement.parentNode.classList.toggle("flipX");
      }, 1000);
      targetElement.parentElement.querySelectorAll(
        ".todo_title"
      )[0].attributes[0].value = "todo_title line_through";

      list[elementId].complete = true;
      localStorage.setItem("todoList", JSON.stringify(list));

      targetElement.attributes.job.value = "done";
      targetElement.attributes.class.value = "far fa-check-circle circle_big";
    } else if (elementJob == "done") {
      targetElement.parentNode.classList.toggle("flipX");
      setTimeout(function () {
        targetElement.parentNode.classList.toggle("flipX");
      }, 1000);

      targetElement.parentElement.childNodes[3].attributes.class.value =
        " todo_title";
      list[elementId].complete = false;
      localStorage.setItem("todoList", JSON.stringify(list));
      targetElement.attributes.job.value = "undone";
      targetElement.attributes.class.value = "far fa-circle circle_big";
    } else if (elementJob == "delete") {
      list[elementId].trash = true;
      localStorage.setItem("todoList", JSON.stringify(list));
      removeTODO(targetElement);
    }
  }
});

// add data in localstorage
// localStorage.setItem("todo", JSON.stringify(list));
// let lsVar = localStorage.getItem("todo");
// console.log(lsVar);

//removeTodo From list
const removeTODO = (element) => {
  console.log(element.parentNode);
  // element.parentNode.parentNode.removeChild(element.parentNode);
  element.parentNode.classList.toggle("drop");
  setTimeout(function () {
    element.parentNode.remove();
  }, 500);
  console.log(element);

};

let historyClosed = true;
const displayHistory = () => {
  if (!historyClosed) return;
  historyClosed = false;
  let htodo = {};
  let dates = [];
  const todoHistory = document.getElementById('todoHistory');
  todoHistory.style.display = 'block';
  list.forEach(element => {
    // console.log(element);
    if (!htodo[element.date]) {
      htodo[element.date] = [];
      htodo[element.date].push(element);
      dates.push(element.date);
    } else htodo[element.date].push(element);
  })

  // console.log(dates)


  dates.forEach(element => {
    addDatesInHistory(element);
    htodo[element].forEach(element => {
      // console.log(element)
      addTodoInHistory(element);
    });
  });


  // console.log(htodo);
};


const deleteAllTodo = () => {
  localStorage.clear()
  list = []
  location.reload();
  loadList(list)

};

const clearCheckedTodo = () => {

  list.forEach(element => {
    console.log(element.complete);
    if (element.complete) {
      list[element.id].trash = true;

    }
  })

  console.log(list)
  localStorage.setItem("todoList", JSON.stringify(list));
  location.reload();


};

const closeHistory = () => {
  const todoHistory = document.getElementById('todoHistory');
  todoHistory.style.display = 'none';
  historyClosed = true;
  location.reload();

}


function addDatesInHistory(date) {
  let text = `<li>

      <p class="todoDate" action = "false">${date}</p>

  </li>`;
  const position = "beforeend";
  hisList.insertAdjacentHTML(position, text);

}

function addTodoInHistory({
  todoName,
  id,
  complete,
  trash
}) {

  let classname = complete ? "far fa-check-circle" : "far fa-circle";
  let job = complete ? "done" : "undone";
  let todoClass = complete ? "todo_title line_through" : "todo_title";
  let text = `<li>

      <i class=" ${classname} circle_big" id="${id}" job="${job}" action = "true"></i>
      <p class="${todoClass}" action = "false">${todoName}</p>
      <i  class="far fa-trash-alt trash_big" id="${id}" job="delete" action = "true"></i>
  </li>`;
  const position = "beforeend";
  hisList.insertAdjacentHTML(position, text);
}



// htodo = {
//   date: [
//     {},{},{}
//   ]
// }