const inquirer = require('inquirer');
require('colors');
console.clear();

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `1. Crear tarea`.green, 
            },
            {
                value: '2',
                name: `2. Completar tarea(s)`.green,
            },
            {
                value: '3',
                name: `3. Listar tareas`.blue,
            },
            {
                value: '4',
                name: `4. Listar tareas completadas`.blue,
            },
            {
                value: '5',
                name: `5. Listar tareas pendientes`.blue,
            },
            {
                value: '6',
                name: `6. Borrar tarea`.red,
            },
            {
                value: '0',
                name: `0. Salir`.red
            },
        ]
    }
];

const inquirerMenu = async () => {
    console.log("========================".cyan);
    console.log(" Seleccione una opción.".cyan);
    console.log("========================".cyan);

    const {option} = await inquirer.prompt(menuOptions);
    return option;
} 

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'option',
            message: `Presione ${'ENTER'.green} para continuar.`,
        }
    ];

    const {option} = await inquirer.prompt(question);
    return option;
}

const readLine = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            // message: message
            message,
            validate(value) {
                if (value.length === 0)
                    return 'Ingrese un valor.';
                return true;
            }
        }
    ];

    const {description} = await inquirer.prompt(question);
    return description;
}

const tasksListDelete = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        i++;
        return  {
            value: task.id,
            name: `${i}. ${task.description}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. Volver'.blue
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const {id} = await inquirer.prompt(questions);
    return id;
}

const tasksCheckList = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        i++;
        return  {
            value: task.id,
            name: `${i}. ${task.description}`,
            checked: (task.completedIn) ? true : false
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(questions);
    return ids;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    pause,
    readLine,
    tasksListDelete,
    confirm,
    tasksCheckList
}