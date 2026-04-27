let tasks = JSON.parse(localStorage.getItem("tasksarray")) || [];
    renderHTML();
    function deleteTask(i) {
      tasks.splice(i,1);
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
        taskText = `<s>${task.name}</s>`
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
      localStorage.setItem("tasksarray",JSON.stringify(tasks));
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
    //adding a task to tasks[] for displaying on the screen
    button = document.getElementById("AddTask");
    button.addEventListener("click", ()=> {
        let input = document.getElementById("taskinput");
        let name = input.value;
        if(name==='') {
          alert("Add Any Task");
        }
        else {
          tasks.push({name: name,completed: false});
          renderHTML();
        }
        input.value = '';
    });