console.log("Hellooo");
const input=document.querySelector('input[name="input"]');
const btn=document.querySelector(".btn");
const container=document.querySelector(".container");
const todolist=document.querySelector(".todo-list");

console.log(input);
console.log(btn);
console.log(container);
console.log(todolist);

window.addEventListener("load",()=>{
    const savedTodos=JSON.parse(localStorage.getItem("todos"))||[];
    savedTodos.forEach(todo=>AddInput(todo));
});

btn.addEventListener("click",()=>{
    const value=input.value;
    if(value.trim()!==''){
        console.log('button clicked');
        input.value='';
        AddInput(value);
    }
    
});
input.addEventListener("keypress",(ev)=>{
    if(ev.key==="Enter" && input.value.trim()!==''){
        const value=input.value;
        AddInput(value);
        input.value='';
        savedToLocalStorage();
    }
});
function AddInput(value){
    const contain=document.createElement("li");
    contain.classList.add("todo-item");
    const newEle=document.createElement("p");
    // contain.add(p);
    newEle.innerText=value;
    // document.body.appendChild(newEle);
    console.log("element added");
//  Adding icon in the document
    const newIcon=document.createElement("i");
    newIcon.classList.add("fa-solid","fa-xmark","icon"); 
    // document.body.appendChild(newIcon);
    console.log("icon added");

    contain.appendChild(newEle);
    contain.appendChild(newIcon);

    // document.body.appendChild(contain);
    
    todolist.appendChild(contain);

    newIcon.addEventListener("click",()=>{
        todolist.removeChild(contain);
        savedToLocalStorage();
    })

    newEle.addEventListener("click",()=>{
        const inputField=document.createElement("input");
        inputField.type="text";
        inputField.value=newEle.innerText;
        contain.replaceChild(inputField,newEle);
        inputField.addEventListener("keypress",(ev)=>{
            if(ev.key==="Enter" && inputField.value.trim()!==''){
                newEle.innerText=inputField.value;
                contain.replaceChild(newEle,inputField);
                contain.classList.add("updated");
                savedToLocalStorage();
            }
        });
        inputField.addEventListener("blur",()=>{
            newEle.innerText=inputField.value;
            contain.replaceChild(newEle,inputField);
            contain.classList.add("updated");
            savedToLocalStorage();
        });
        inputField.focus();
        // document.body.appendChild(inputField);   
    })
}

function savedToLocalStorage(){
    const todos=[];
    const todoItems=document.querySelectorAll(".todo-item p");
    todoItems.forEach(todo=>{
        todos.push(todo.innerText);
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
