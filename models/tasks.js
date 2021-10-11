const Task = require("./task");
require('colors');

class Tasks {

    _tasksList;

    constructor() {
        this._tasksList = new Map();
    }

    async addTask(description = '') {
        try {
            const task = new Task(description);
            this._tasksList.set(task.id, task);
            return true;
        } catch (e) {
            throw e;
        }
    } 

    deleteTask(id = '') {
        if (this._tasksList.get(id)) 
            this._tasksList.delete(id);
    } 

    uploadTasksFromArray(tasks = []) {
        tasks.map((task) => {
            this._tasksList.set(task.id, task);
        })
    }

    tasksView() {
        let status = '';
        this.getTasks.forEach(({description, completedIn}, i) => {
            i++;
            status = (completedIn) ? 'Completada'.green : 'Pendiente'.red;
        
            console.log(`${i}. ${description} - ${status}`);
        })
    }

    getFilterTasks(completed = true) {
        this.getTasks.forEach(({description, completedIn}, i) => {
            i++;
            if (completed) {
                if (completedIn)
                    console.log(`${i}. ${description} - ${'Completada:'.green} ${completedIn}`);
            } else {
                if ( ! completedIn)
                    console.log(`${i}. ${description} - ${'Pendiente'.red}`);
            }
        })
    }

    get getTasks() {
        const list = [];
        
        // Pasamos todo a un arreglo para que sea más sencillo de ver
        this._tasksList.forEach((task) => {
            list.push(this._tasksList.get(task.id));
        })

        return list;
    }

    toggleStatusTask(ids = []) {
        ids.map(id => {
            const task = this._tasksList.get(id);
            if ( ! task.completedIn) {
                task.completedIn = new Date().toISOString();
            }
        });

        this.getTasks.map(task => {
            if ( ! ids.includes(task.id)) 
                this._tasksList.get(task.id).completedIn = null; 
        });
    }
}

module.exports = Tasks
