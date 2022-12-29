(function() {



    let tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    console.log('Working');

    function addTaskToDom(task) {
        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" id="${task.id}" data-id="${task.id}" ${task.completed ? 'checked' : ''}  class="custom-checkbox">
        <label for="${task.id}" >${task.title} </label>
        <img src="images/bin.ico" class="delete" id="${task.id}" />

`;
        taskList.append(li);
    }

    function renderList() {
        taskList.innerHTML = '';
        for (let i = 0; i < tasks.length; i++) {
            addTaskToDom(tasks[i]);
        }
        tasksCounter.innerHTML = tasks.length;
    }

    function toggleTask(taskId) {
        const task = tasks.filter(function (task) {
            return task.id === Number(taskId);
        });

        if (task.length > 0) {
            const currenttask = task[0];
            currenttask.completed = !currenttask.completed;
            renderList();
            showNotification('task toggled successfully');
            return;
        }
        showNotification("could not toggle the task");
    }

    function deleteTask(taskId) {
        const newtasks = tasks.filter(function (task) {
            return task.id !== Number(taskId);
        })
        tasks = newtasks;
        renderList();
        showNotification('Task deleted successfully');
    }

    function addTask(task) {
        if (task) {
            tasks.push(task);
            renderList();
            showNotification('Task added successfully');
            return;
        }
        showNotification("Task can't added");
    }

    function showNotification(title) {
        alert(title);
    }

    function handleInputKeypress(e) {
        if (e.key === 'Enter') {
            const title = e.target.value;
            console.log('title', title);

            if (!title) {
                showNotification("task can not be empty!!");
                return;
            }
            const task = {
                title: title,
                id: Date.now().toString(),
                completed: false
            }
            e.target.value = '';
            addTask(task)
        }
    }

    function handleClickListener(e) {
        const target = e.target;
        // console.log(target);
        if (target.className == 'delete') {
            const taskId = target.id;
            deleteTask(taskId);
            return;
        } else if (target.className === 'custom-checkbox') {
            const taskId = target.id;
            toggleTask(taskId);
            return;
        }
    }

    async function fetchtodo() {
        // fetch('https://jsonplaceholder.typicode.com/todos').then(function(response){
        //     console.log(response);
        //     return response.json();
        // }).then(function(data){
        //     console.log(data);
        //     tasks=data.slice(0,10);
        //     renderList();
        // }).catch(function(error){
        //     console.log(error);
        // })

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data.slice(0, 10);
            renderList();
        } catch (error) {
            console.log(error);
        }
    }

    function intializeApp() {
        fetchtodo();
        addTaskInput.addEventListener('keyup', handleInputKeypress);
        document.addEventListener('click', handleClickListener);
    }
    intializeApp();

})()