
let tasks = []; // {title: "ddddd", done: false}
let importitems=0;
function renderEditor() {
    let inputEl = document.querySelector("#default-todo-panel .todo-editor > input");

    // inputEl.onchange = (e) => {
    //     console.log("text,", e.target.value);
    //     // console.log("input change: ", e);
    // };

    let addTask = () => {
        if (inputEl.value.length === 0) {
            return;
        }

        let newTask = {
            title: inputEl.value,
            done: false,
            import: false
        };

        inputEl.value = "";

        tasks.push(newTask);

        console.log("tasks:", tasks);

        renderTaskItems();
    };

    inputEl.onkeypress = (e) => {

        if (e.key === "Enter") {
            addTask();
        }
    };

    let addEl = document.querySelector("#default-todo-panel .todo-editor > button");
    addEl.onclick = (e) => {
        addTask();
    };
}

function renderTaskItems() {
    console.log("render items");
    let itemsEl = document.querySelector("#default-todo-panel .todo-items");

    itemsEl.querySelectorAll("div").forEach((node) => node.remove());

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let itemEl = document.createElement("div");
        itemEl.className = "task";

        let doneEl = document.createElement("input");
        doneEl.type = "checkbox";
        doneEl.checked = task.done;
        if (task.done) {
            itemEl.classList.add("done");
        } else {
            itemEl.classList.remove("done");
        }

        doneEl.onchange = (e) => {
            task.done = e.target.checked;
            if (task.done) {
                itemEl.classList.add("done");
            } else {
                itemEl.classList.remove("done");
            }
        };
        itemEl.append(doneEl);

        let titleEl = document.createElement("label");
        titleEl.innerText = task.title;
        itemEl.append(titleEl);

        let ctrlbarEl = renderTaskCtrlBar(task,itemEl, i);

        itemEl.append(ctrlbarEl);

        itemsEl.append(itemEl);
    }
}


function renderTaskCtrlBar(task, itemEl, taskIdx) {
    let ctrlbarEl = document.createElement("div");
    ctrlbarEl.className = "ctrlbar";

    let impEl = document.createElement("input");
    impEl.type = "checkbox";
    impEl.checked = task.import;
    if (task.import) {
        itemEl.classList.add("import");
    }
    else {
        itemEl.classList.remove("import");
    }
    impEl.onchange = (e) => {
        task.import = e.target.checked;
        if (task.import) {
            itemEl.classList.add("import");
            let t = task;
            for (let j = taskIdx; j > 0; j--) {
                tasks[j] = tasks[j - 1];
            }
            tasks[0] = t;
            importitems++;
        }
        else {
            itemEl.classList.remove("import");
            let t = task;
            for (let j = taskIdx; j <tasks.length-1; j++) {
                tasks[j] = tasks[j+1];
            }
            tasks[tasks.length-1] = t;
            importitems--;
        }
        renderTaskItems();

    }
    ctrlbarEl.append(impEl);

    let upEl = document.createElement("button");
    if (taskIdx === 0||taskIdx===importitems) {
        upEl.disabled = true;
    }
    upEl.innerText = "↿";
    upEl.onclick = () => {
        let t = tasks[taskIdx];
        tasks[taskIdx] = tasks[taskIdx - 1];
        tasks[taskIdx - 1] = t;
        renderTaskItems();
    };
    ctrlbarEl.append(upEl);

    let downEl = document.createElement("button");
    if (taskIdx ===tasks.length-1||taskIdx===importitems-1) {
        downEl.disabled = true;
    }
    downEl.innerText = "⇂";
    downEl.onclick = () => {
        let t = tasks[taskIdx];
        tasks[taskIdx] = tasks[taskIdx + 1];
        tasks[taskIdx + 1] = t;
        renderTaskItems();
    };
    ctrlbarEl.append(downEl);

    let cancelEl = document.createElement("button");
    cancelEl.innerText = "X";
    cancelEl.onclick = () => {
        tasks.splice(taskIdx, 1);
        renderTaskItems();
    };

    ctrlbarEl.append(cancelEl);
    return ctrlbarEl;
}

renderEditor();
renderTaskItems();