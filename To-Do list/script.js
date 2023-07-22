//select the elements
const clear = document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")

//classes names
const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle-thin"
const LINE_THROUGH = "lineThrough"

//VARIABLES
let LIST, id;

//get item from localStorage
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
  LIST = JSON.parse(data)
  id= LIST.length; //set the id to the last one of list
  loadList(LIST); //load the list to user interface
} else {
  LIST = []
  id = 0
}

//load the list to user interface
function loadList(array){
  array.forEach(item => {
    addToDo(item.name, item.id, item.done, item.trash)
  });
}

//clear the local storage
clear.addEventListener("click",function(){
  localStorage.clear()
  location.reload()
});

//showing the date
const options = {weekday: "long", month: "short", day: "numeric"}
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options)

//add to do function
function addToDo(toDo, id, done, trash){
  
  if(trash){return ; }
  
  const DONE = done ? CHECK: UNCHECK;
  
  const LINE = done ? LINE_THROUGH: "";
  
  const item = `<li class= "item">
  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
  <p class="text" ${LINE}>${toDo}</p>
  <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
  </li>`
  
  list.insertAdjacentHTML("beforeend", item)

}

//add an item to list, after pressing enter key.
document.addEventListener("keypress", function(event){
  if(event.key === "Enter"){
    const toDo = input.value

    //if the input isn't empty
    if(toDo){
      addToDo(toDo, id, false, false, false)

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });

      //add item to localStorage( this code must be added where the LIST array is getting updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = ""
  }
});

//complete to-do
function completeToDo(element){
  element.classList.toggle(CHECK)
  element.classList.toggle(UNCHECK)
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

  LIST[element.id].done = LIST[element.id].done ? false: true;

  localStorage.setItem("TODO", JSON.stringify(LIST));
}

//remove to do
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode)

  LIST[element.id].trash = true
}


//target the items created dynamically 
list.addEventListener("click", function(event){
  const element = event.target;  //returns the clicked element inside list
  const elementjob = element.attributes.job.value; //complete or delete

  if (elementjob == "complete"){
    completeToDo(element)
  } else if (elementjob == "delete"){
    removeToDo(element)
  }
  //add item to localStorage( this code must be added where the LIST array is getting updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});