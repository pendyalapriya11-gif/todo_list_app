let tasks = JSON.parse(localStorage.getItem("tasksarray")) || [];
    renderHTML();
    function deleteTask(i) {
      tasks.splice(i,1);
      renderHTML();
    }
    function clearCompleted() {
      tasks = tasks.filter(task => task.completed===false);
      renderHTML();
    }
    function toggleTask(i) {
      tasks[i].completed = !tasks[i].completed;
      renderHTML();
    }
    function renderHTML() {
      let taskhtml = '';
      
      for(let i=0;i<tasks.length;i++) {
        let task = tasks[i];
        let taskText= '';
        if(task.completed) {
        taskText = `<span class="completedtask">${task.name}</span>`;
      }
      else {
        taskText = task.name;
      }
        taskhtml+=`
        <div class="taskshtml">
        <input type="checkbox" 
        ${task.completed ? "checked" : ""}
        data-index="${i}">
        ${taskText}
          <button data-index="${i}" class="delete-button">Delete</button>
          </div>
        `;
      }

      document.getElementById("tasklist").innerHTML = taskhtml;
      //adding the local storage
      localStorage.setItem("tasksarray",JSON.stringify(tasks));
      //implementing task counter
      let total = tasks.length;
      let completedtasks = tasks.filter(task1=> task1.completed === true).length;
      let remainingtasks = total - completedtasks;
      document.querySelector(".task_counter").innerHTML = `Total: ${total}  | Completed: ${completedtasks} | Remaining: ${remainingtasks}`;
    }

    //event delegation
    document.querySelector('#tasklist').addEventListener("click",(event) => {
      if(event.target.getAttribute("data-index")===null) return;
       let index = Number(event.target.getAttribute("data-index"));
        if(event.target.tagName === "BUTTON") {
          deleteTask(index);
        }
        else if(event.target.tagName === "INPUT") {
           toggleTask(index);
        }
      });
      function addTask() {
        let input = document.getElementById("taskinput");
        let name = input.value;
        if(name.trim()==='') {
          alert("Add Any Task");
        }
        else {
          tasks.push({name: name,completed: false});
          renderHTML();
        }
        input.value = '';
      }
    //adding a task to tasks[] for displaying on the screen
    button = document.getElementById("AddTask");
    button.addEventListener("click", ()=> {
        addTask();
    });
    document.querySelector("#taskinput").addEventListener("keydown", (event)=> {
      if(event.key === "Enter") {
        addTask();
      } 
    });
    let clearbutton = document.getElementById("clearCompleted");
    clearbutton.addEventListener("click", ()=> {
      clearCompleted();
      renderHTML();
    });