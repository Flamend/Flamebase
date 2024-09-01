const fs = require("fs");

let LogChanges = false;

function enableLog(){
    LogChanges = true;
    console.log("Flamebase Note: each json file you made you must type \"{}\" inside it.")
}

const Databases = {};

/**
 * 
 * @param {String} DatabaseName 
 * @param {String} JSONFilePath 
 */

function registerDatabase(DatabaseName, JSONFilePath){
    if (Databases[DatabaseName]) throw new Error("Database already exist...");
    if(Object.values(Databases).includes(JSONFilePath)) throw new Error("A database already exist with this json file path...");
    Databases[DatabaseName] = JSONFilePath;
    if(LogChanges) console.log(`Registered "${DatabaseName}" as a database name for this json file path: "${JSONFilePath}"`)
}

/**
 * 
 * Removes a database from the databases object
 * 
 * @param {String} DatabaseName 
 */

function removeDatabase(DatabaseName){
    if (!Databases[DatabaseName]) throw new Error("Database does not exist...");
    delete Databases[DatabaseName];
    if(LogChanges) console.log(`"${DatabaseName}" database has been removed.`)
}

/**
 * @returns Databases Object
 */

function getDatabases(){
    return Databases;
}

/**
 * 
 * @param {String} DatabaseName 
 * @returns 
 */

function getDatabaseStats(DatabaseName) {
    const databasePath = Databases[DatabaseName];
    if (!fs.existsSync(databasePath)) {
        throw new Error('Database does not exist...');
    }

    const data = JSON.parse(fs.readFileSync(databasePath, 'utf8'));
    const stats = fs.statSync(databasePath);

    return {
        entries: Array.isArray(data) ? data.length : Object.keys(data).length,
        size: stats.size,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime
    };
}

/**
 * 
 * @param {String} DatabaseName 
 */
function clearDatabase(DatabaseName) {
    const databasePath = Databases[DatabaseName];
    if (!fs.existsSync(databasePath)) {
        throw new Error('Database does not exist...');
    }

    fs.writeFileSync(databasePath, JSON.stringify({}));
    if (LogChanges) return console.log(`Database "${DatabaseName}" has been cleared.`);
}

/**

 * Writes data to database.

 *

 * @param {Object} options

 * @param {string} options.Property

 * @param {*} options.Data

 * @param {boolean} options.AutoAlign

 * @param {string} options.Database

 */

function write({ Property, Data, AutoAlign, Database }) {
    try {
        if (!Property) throw new Error("Enter a property name.");
        if (!Database || !Databases[Database]) throw new Error("Database does not exist.");

        let json = {};

        const JsonFilePath = Databases[Database];

        if (fs.existsSync(JsonFilePath)) {
            const json_data = fs.readFileSync(JsonFilePath, 'utf-8');
            if (json_data.trim().length > 0) {
                json = JSON.parse(json_data);
            }
        }

        const properties = Property.split('.');
        let currentObject = json;
        for (let i = 0; i < properties.length - 1; i++) {
            const property = properties[i];
            if (!currentObject[property] || typeof currentObject[property] !== 'object') {
                currentObject[property] = {};
            }
            currentObject = currentObject[property];
        }

        const lastProperty = properties[properties.length - 1];
        currentObject[lastProperty] = Data;

        const formattedJSON = AutoAlign ? JSON.stringify(json, null, 2) : JSON.stringify(json);
        fs.writeFileSync(JsonFilePath, formattedJSON);

        if (LogChanges) return console.log(`${Property} has been written to ${JsonFilePath}`);
    } catch (error) {
        console.log(error);
    }
}





/**

 * Update specific things in the database.

 *

 * @param {Object} options

 * @param {string} options.Property

 * @param {*} options.Data

 * @param {boolean} options.AutoAlign

 * @param {string} options.Database

 */

function update({ Property, Data, AutoAlign, Database }) {
    try {
        if (!Property) throw new Error("Enter a property name.");
        if (!Database || !Databases[Database]) throw new Error("Database does not exist.");

        let json = {};
        const JsonFilePath = Databases[Database];

        if (fs.existsSync(JsonFilePath)) {
            const json_data = fs.readFileSync(JsonFilePath, 'utf-8');
            if (json_data.trim().length > 0) {
                json = JSON.parse(json_data);
            }
        }

        const properties = Property.split('.');
        let currentObject = json;
        for (let i = 0; i < properties.length - 1; i++) {
            const property = properties[i];
            if (!currentObject[property] || typeof currentObject[property] !== 'object') {
                currentObject[property] = {};
            }
            currentObject = currentObject[property];
        }

        const lastProperty = properties[properties.length - 1];

        if (typeof currentObject[lastProperty] === 'object' && typeof Data === 'object') {
            currentObject[lastProperty] = { ...currentObject[lastProperty], ...Data };
        } else {
            currentObject[lastProperty] = Data;
        }

        const formattedJSON = AutoAlign ? JSON.stringify(json, null, 2) : JSON.stringify(json);
        fs.writeFileSync(JsonFilePath, formattedJSON);

        if (LogChanges) return console.log(`${Property} has been updated in ${JsonFilePath}`);
    } catch (error) {
        console.log(error);
    }
}

/**

 * Removes a property from a database.

 *

 * @param {Object} options

 * @param {string} options.Property

 * @param {boolean} options.AutoAlign

 * @param {string} options.Database

 */

function remove({ Property, Database, AutoAlign }) {
    try {
        if (!Property) throw new Error("Enter a property name.");
        if (!Database || !Databases[Database]) throw new Error("Database does not exist.");

        let json = {};
        const JsonFilePath = Databases[Database];

        if (fs.existsSync(JsonFilePath)) {
            const json_data = fs.readFileSync(JsonFilePath, 'utf-8');
            if (json_data.trim().length > 0) {
                json = JSON.parse(json_data);
            }
        }

        const properties = Property.split('.');
        let currentObject = json;
        for (let i = 0; i < properties.length - 1; i++) {
            const property = properties[i];
            if (!currentObject[property] || typeof currentObject[property] !== 'object') {
                return;
            }
            currentObject = currentObject[property];
        }

        const lastProperty = properties[properties.length - 1];
        delete currentObject[lastProperty];

        const formattedJSON = AutoAlign ? JSON.stringify(json, null, 2) : JSON.stringify(json);
        fs.writeFileSync(JsonFilePath, formattedJSON);

        if (LogChanges) return console.log(`${Property} has been removed from ${JsonFilePath}`);
    } catch (error) {
        console.log(error);
    }
}

/**

 * Push something to an array in a database

 *

 * @param {Object} options

 * @param {string} options.Property

 * @param {*} options.Value

 * @param {boolean} options.AutoAlign

 * @param {string} options.Database

 */


function pushToArray({ Property, Value, AutoAlign, Database }) {
    try {
        if (!Property) throw new Error("Enter a property name.");
        if (!Database || !Databases[Database]) throw new Error("Database does not exist.");

        let json = {};
        const JsonFilePath = Databases[Database];

        if (fs.existsSync(JsonFilePath)) {
            const json_data = fs.readFileSync(JsonFilePath, 'utf-8');
            if (json_data.trim().length > 0) {
                json = JSON.parse(json_data);
            }
        }

        const properties = Property.split('.');
        let currentObject = json;
        for (let i = 0; i < properties.length - 1; i++) {
            const property = properties[i];
            if (!currentObject[property] || typeof currentObject[property] !== 'object') {
                currentObject[property] = {};
            }
            currentObject = currentObject[property];
        }

        const lastProperty = properties[properties.length - 1];

        if (!Array.isArray(currentObject[lastProperty])) {
            currentObject[lastProperty] = [];
        }

        currentObject[lastProperty].push(Value);

        const formattedJSON = AutoAlign ? JSON.stringify(json, null, 2) : JSON.stringify(json);
        fs.writeFileSync(JsonFilePath, formattedJSON);

        if (LogChanges) return console.log(`${Value} has been pushed to ${Property} in ${JsonFilePath}`);
    } catch (error) {
        console.log(error);
    }
}

/**

 * Removes something from an array in a database.

 *

 * @param {Object} options

 * @param {string} options.Property

 * @param {*} options.Value

 * @param {boolean} options.AutoAlign

 * @param {string} options.Database

 */

function removeFromArray({ Property, Value, AutoAlign, Database }) {
    try {
        if (!Property) throw new Error("Enter a property name.");
        if (!Database || !Databases[Database]) throw new Error("Database does not exist.");

        let json = {};
        const JsonFilePath = Databases[Database];
        if (fs.existsSync(JsonFilePath)) {
            const json_data = fs.readFileSync(JsonFilePath, 'utf-8');
            if (json_data.trim().length > 0) {
                json = JSON.parse(json_data);
            }
        }

        const properties = Property.split('.');
        let currentObject = json;
        for (let i = 0; i < properties.length - 1; i++) {
            const property = properties[i];
            if (!currentObject[property] || typeof currentObject[property] !== 'object') {
                return;
            }
            currentObject = currentObject[property];
        }

        const lastProperty = properties[properties.length - 1];

        if (!Array.isArray(currentObject[lastProperty])) {
            return;
        }

        currentObject[lastProperty] = currentObject[lastProperty].filter(item => item !== Value);

        const formattedJSON = AutoAlign ? JSON.stringify(json, null, 2) : JSON.stringify(json);
        fs.writeFileSync(JsonFilePath, formattedJSON);

        if (LogChanges) return console.log(`${Value} has been removed from ${Property} in ${JsonFilePath}`);
    } catch (error) {
        console.log(error);
    }
}


/**

 * Take a specific property from a database or the whole database.

 *

 * @param {Object} options

 * @param {string} options.Property

 * @param {string} options.Database

 */

function get({ Property, Database }) {
    try {
        if (!Database || !Databases[Database]) throw new Error("Database does not exist.");

        let json = {};
        const JsonFilePath = Databases[Database];

        if (fs.existsSync(JsonFilePath)) {
            const json_data = fs.readFileSync(JsonFilePath, 'utf-8');
            if (json_data.trim().length > 0) {
                json = JSON.parse(json_data);
            }
        } else {
            throw new Error("JSON file does not exist.");
        }

        if (!Property) {
            return json;
        }

        const properties = Property.split('.');
        let currentObject = json;

        for (const property of properties) {
            if (!currentObject || !currentObject.hasOwnProperty(property)) {
                return undefined;
            }
            currentObject = currentObject[property];
        }

        return currentObject;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

module.exports = {
    enableLog,
    registerDatabase,
    removeDatabase,
    getDatabases,
    getDatabaseStats,
    clearDatabase,
    write,
    update,
    remove,
    pushToArray,
    removeFromArray,
    get,
}