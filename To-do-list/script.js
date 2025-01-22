document.addEventListener("DOMContentLoaded", () => {
    const inp = document.getElementById("taskInput");
    const sub = document.getElementById("taskSubmit");
    const taskList = document.getElementById("taskList");

    tasks = JSON.parse(localStorage.getItem("task")) || [];
    tasks.forEach(task => allotTasks(task));


    sub.addEventListener("click", () => {
        const taskText = inp.value;

        const newTask = {
            id: tasks.length,
            text: taskText,
            completed: false,
        }
        tasks.push(newTask);
        console.log(tasks);
        saveTask(tasks);
        allotTasks(newTask);
        inp.value = "";
        console.log(tasks);
    });

    function allotTasks(task){
        let li = document.createElement("li");
        li.setAttribute("id", task.id);
        li.innerHTML = `
        <span>${task.text}</span>
        <button>Remove</button>
        `
        li.querySelector("button").setAttribute("class", "butt")

        li.querySelector("button").addEventListener("click", (e) => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTask(tasks);
            li.remove();
        });

        li.addEventListener("click", () => {
            task.completed =!task.completed;
            saveTask(tasks);
            li.classList.toggle("completed");
        });

        taskList.appendChild(li);
    }

    function saveTask(task){
        localStorage.setItem("task", JSON.stringify(task));
    }

    function dltTask(task){

    }

});