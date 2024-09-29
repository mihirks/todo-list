var data =[];

if (!localStorage.getItem("all_tasks")){
    data=[];
}
else
{
    data=JSON.parse(localStorage.getItem("all_tasks"));
}
// console.log(data);

const new_submit = document.getElementById("new-task-submit");
// console.log(new_submit);

// Add New task
new_submit.addEventListener("click",()=>
{
    const new_content = document.getElementById("new-task-content");
    // console.log(data);
    if (new_content.value.trim() == "")
    {
        alert("Cannot be empty");
    }
    else{
        createTask(new_content.value.trim());
    }
})

function createTask(new_data)
{
    data.push(new_data);
    localStorage.setItem("all_tasks",JSON.stringify(data));
    location.reload();
}

//delete task


function displayTasks(){
    const list_1=document.getElementsByClassName("content-list")[0];
    // console.log(list_1);
    data.forEach(element => {
        console.log(element);
        const division=document.createElement("div");
        division.classList.add("task");

        const div2 = document.createElement("div");
        div2.classList.add("task-content");

        const inp1 = document.createElement("input");
        inp1.setAttribute("type","text");
        inp1.setAttribute("readonly","");
        inp1.setAttribute("value",element);
        inp1.classList.add("task-content");

        div2.appendChild(inp1);
        division.appendChild(div2);

        const b1=document.createElement("button");
        b1.setAttribute("id","task-edit");
        b1.innerText="EDIT";

        const b2=document.createElement("button");
        b2.setAttribute("id","task-delete");
        b2.innerText="DELETE";

        division.appendChild(b1);
        division.appendChild(b2);

        list_1.appendChild(division);
    });
    onDelete();
    onModify();
}

function onDelete(){

    const del=document.querySelectorAll("#task-delete");
    // console.log(del);


    del.forEach((element,i) =>{

        element.addEventListener("click", ()=>{
            // console.log(element,i);
            data.splice(i,1);
            localStorage.setItem("all_tasks",JSON.stringify(data));
            location.reload();
        });
    })
}

function onModify(){
    const mod = document.querySelectorAll("#task-edit");
    mod.forEach((element,i)=>{
        
        element.addEventListener("click",()=>
        {
            // console.log(element);
            if (element.innerText =="EDIT")
            {   
                // console.log(document.querySelectorAll(".task-content .task-content")[i]);
                (document.querySelectorAll(".task-content .task-content")[i]).removeAttribute("readonly","");
                // console.log(document.querySelectorAll(".task-content .task-content")[i]);
                element.innerText="SAVE";
                element.style.color="pink";
                element.style.backgroundImage = "linear-gradient(to right,#f35ba7,#8d084b)"
            }
            else
            {
                if (document.querySelectorAll(".task-content .task-content")[i].value.trim() == "")
                {
                    alert("Cannot be empty");
                    location.reload();
                }
                else{
                document.querySelectorAll(".task-content .task-content")[i].setAttribute("readonly","");
                // console.log(document.querySelector(".task-content .task-content"));
                element.innerText="EDIT";
                element.style.color="rgb(15, 243, 15)";
                element.style.backgroundImage = "linear-gradient(to right,rgb(15, 243, 15),rgb(3, 94, 3))";
                // console.log();

                data.splice(i,1,document.querySelectorAll(".task-content .task-content")[i].value);
                localStorage.setItem("all_tasks",JSON.stringify(data));
                // location.reload();
                }
            }
            
        })

    })

}

window.onload =()=>{
    displayTasks();
    // localStorage.clear();

}