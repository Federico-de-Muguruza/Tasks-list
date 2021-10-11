const { inquirerMenu, pause, readLine, tasksListDelete, confirm, tasksCheckList} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Task = require('./models/task');
const Tasks = require('./models/tasks');
require('colors');

const main = async () => {
    console.clear();
    let opt = '';
    const tasks = new Tasks();

    // Chequeo si ya hay datos insertados para volver a cargarlos
    const data = readDB();

    if (data) 
        tasks.uploadTasksFromArray(data);

    do {
        opt = await inquirerMenu();

        switch(opt) {
            case '1':
                await addTarea(tasks);
                saveDB(tasks.getTasks);
            break;

            case '2':
                // Lista de ids que completé
                const ids = await tasksCheckList(tasks.getTasks);
                tasks.toggleStatusTask(ids);
                saveDB(tasks.getTasks);
            break; 
                
            case '3':
                tasks.tasksView();
            break;

            case '4':
                tasks.getFilterTasks(true);
            break;

            case '5':
                tasks.getFilterTasks(false);
            break;

            case '6':
                await deleteTask(tasks);
                saveDB(tasks.getTasks);
            break;
        }

        if (opt != 0) 
            await pause();
        console.clear();
    } while (opt != '0');
}

const addTarea = async (tasks) => {
    const description = await readLine('Descripción: ');
    await tasks.addTask(description)
    .then(ok => console.log('Agregado correctamente.'.green))
    .catch(e => console.log('No se pudo agregar.'.red));
}

const deleteTask = async (tasks) => {
    const id = await tasksListDelete(tasks.getTasks);
    if (id != '0') {
        const ok = await confirm('¿Está seguro de que desea borrarlo?');
        if (ok) {
            tasks.deleteTask(id);
            console.log('Se ha borrado la tarea.'.green);
        }
    }
}

main();