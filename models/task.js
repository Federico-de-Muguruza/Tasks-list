const { v4 } = require('uuid');

class Task {

    id = '';
    description = '';
    completedIn = null;

    constructor(description) {
        this.id = v4();
        this.description = description;
        this.completedIn = null;
    }

}

module.exports = Task;