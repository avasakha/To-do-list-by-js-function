
(function () {

    function todoListAppBuilder(input, list, addBtn) {
        function Task(name) {
            this.name = name;
            this.completed = false;
            this.id = Math.random().toString();
        }

        function TaskList() {
            this.tasks = [];

            this.add = function (name) {
                const task = new Task(name);
                this.tasks.push(task);
                return task.id;
            }

            this.remove = function (id) {
                const index = this.tasks.findIndex(function (item) {
                    return item.id === id;
                });
                if (index !== -1) {
                    this.tasks.splice(index, 1);
                }
            }

            this.toggleStatus = function (id) {
                const item = this.tasks.find(function (item) {
                    return item.id === id;
                });
                if (item) {
                    item.completed = !item.completed;
                }
            }
        }

        const todoList = new TaskList();

        addBtn.addEventListener('click', function () {
            const name = input.value;
            todoList.add(name);
            input.value = '';

            function draw() {
                list.innerHTML = '';
                todoList.tasks.forEach(function (task) {
                    const taskId = task.id;
                    const li = document.createElement('li');
                    li.textContent = task.name;
                    li.className = task.completed ? 'checked' : '';

                    const closeButton = document.createElement('span');
                    closeButton.textContent = '×';
                    closeButton.classList = 'close';
                    closeButton.onclick = function () {
                        todoList.remove(taskId);
                        draw();
                    }
                    li.appendChild(closeButton);
                    list.appendChild(li);

                    li.onclick = function () {
                        todoList.toggleStatus(taskId);
                        draw();
                    }
                })
            }

            draw();

        })
    };

    const list = document.getElementsByClassName('todo-list');
    todoListAppBuilder(
        document.getElementById('myInput'),
        list[0],
        document.getElementById('addBtn')
    );
    todoListAppBuilder(
        document.getElementById('myInput2'),
        list[1],
        document.getElementById('addBtn2')
    );

})();
