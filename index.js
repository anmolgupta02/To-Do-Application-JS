//lets select some Elements
const clear = document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")

//Classes Name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin"
const LINE_THROUGH = "lineThrough"


//Show Today's date logic
const today = new Date(); 
const options = {weekday:"long", month:"short",day:"numeric"}
dateElement.innerHTML = today.toLocaleDateString("en-us", options);

//Variables 
let LIST, id;

//get Item from Local Storage
let data = localStorage.getItem("TODO");

//Checking if data is empty or not. 
if(data){

    LIST = JSON.parse(data)
    id = LIST.length;
    loadList(LIST);

}else{
    LIST = [];
    id = 0;

}

//In case data is there on local storage then load data from local storage
function loadList(array){
    array.forEach(element => {
        addToDo(element.name, element.id, element.done, element.trash) 
    });
}

//clear the local storage
clear.addEventListener("click", function(event){
    localStorage.clear()
    location.reload()
})


//add to-do function
function addToDo(toDo, id, done, trash){

    if(trash){return}

    const DONE = done?CHECK:UNCHECK;
    const LINE = done? LINE_THROUGH : "";


    const item = `
    <li class = "item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>  
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);

}

//add an item to the list user the enter key
document.addEventListener("keyup", function(event) {
    if(event.keyCode==13){
        const toDo = input.value;
        //checking if the todo is not empty
       if(toDo){
        addToDo(toDo, id, false, false);

        LIST.push(
           {
            name: toDo,
            id: id,
            done: false,
            trash: false
           }
        );
        id++;
        //get Item from Local Storage
        localStorage.setItem("TODO", JSON.stringify(LIST));

    }
    input.value = "";
    //get Item from Local Storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
}
})

// addToDo("Coffee", 1 ,true, false)

//complete ToDO

function completeToDo(element){

    //Changing all the relevant classes for an particular element. 
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Removing a To do

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//target the items created dynamically. 

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob=="complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    //get Item from Local Storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
})


