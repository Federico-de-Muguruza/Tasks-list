const fs = require('fs');
const file = './db/data.json';

const saveDB = (data) => {
    
    createFolder();

    fs.writeFileSync(file, JSON.stringify(data));
}

const readDB = () => {
    if ( ! fs.existsSync(file))
        return null;
    
    const info = fs.readFileSync(file, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data;
}

const createFolder = () => {
    const folder = './db';

    if ( ! fs.existsSync(folder)) 
        fs.mkdirSync(folder);  
}

module.exports = {
    saveDB,
    readDB
}