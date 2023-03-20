const fs = require('fs');
let LogChanges = false;

function setLog(logStatus) {
    LogChanges = logStatus;
}

/**
 * Write data to a JSON file.
 *
 * @param {Object} options
 * @param {string} options.Property
 * @param {*} options.Data
 * @param {boolean} options.AutoAlign
 * @param {string} options.JsonFilePath
 */

function write({ Property, Data, AutoAlign, JsonFilePath }) {
    try {
        if (!Property) throw new Error("Enter a property name.");
        if (!Data) throw new Error("Enter data to write it to the property.");
        if (!JsonFilePath) throw new Error("Enter JSON file path.");

        const json_data = fs.readFileSync(JsonFilePath);
        const json = JSON.parse(json_data);
        json[Property] = Data;

        AutoAlign ? fs.writeFileSync(JsonFilePath, JSON.stringify(json, null, 2)) : fs.writeFileSync(JsonFilePath, JSON.stringify(json));
        if (LogChanges) return console.log(`${Property} has been written to ${JsonFilePath}`);
    } catch (error) {
        console.log(error)
    }
}

/**
 * Remove data from a JSON file.
 *
 * @param {Object} options
 * @param {string} options.Property
 * @param {boolean} options.AutoAlign
 * @param {string} options.JsonFilePath
 */

function remove({ Property, AutoAlign, JsonFilePath }) {
    if (!Property) throw new Error("Enter a property name.");
    if (!JsonFilePath) throw new Error("Enter JSON file path.");
    try {
        let json_data = fs.readFileSync(JsonFilePath);
        let json = JSON.parse(json_data);
        delete json[Property];
        AutoAlign ? fs.writeFileSync(JsonFilePath, JSON.stringify(json, null, 2)) : fs.writeFileSync(JsonFilePath, JSON.stringify(json));
        if (LogChanges) return console.log(`${Property} has been removed from ${JsonFilePath}`);
    } catch (error) {
        console.log(error)
    }
}

/**
 * Remove data from a JSON file.
 *
 * @param {Object} options
 * @param {string} options.Property
 * @param {*} options.Data
 * @param {boolean} options.AutoAlign
 * @param {string} options.JsonFilePath
 */

function update({ Property, Data, AutoAlign, JsonFilePath }) {
    if (!Property) throw new Error("Enter a property name.");
    if (!Data) throw new Error("Enter data to write it to the property.");
    if (!JsonFilePath) throw new Error("Enter JSON file path.");
    let json = {};
    try {
        const json_data = fs.readFileSync(JsonFilePath);
        json = JSON.parse(json_data);
        if (json[Property]) {
            json[Property] = Object.assign({}, json[Property], Data);
        } else {
            json[Property] = Data;
        }

        AutoAlign ? fs.writeFileSync(JsonFilePath, JSON.stringify(json, null, 2)) : fs.writeFileSync(JsonFilePath, JSON.stringify(json));
        if (LogChanges) return console.log(`Updated ${Property} in ${JsonFilePath}`);
    } catch (error) {
        console.log(error);
    }
}

/**
 * @param {Object} options
 * @param {string} options.Property
 * @param {string} options.JsonFilePath
 */

function get({ Property, JsonFilePath }){
    if (!Property) throw new Error("Enter a property name.");
    if (!JsonFilePath) throw new Error("Enter JSON file path.");
    try {
        const json_data = fs.readFileSync(JsonFilePath);
        json = JSON.parse(json_data);

        if (LogChanges) console.log(`Getting ${Property} data from ${JsonFilePath}`);
        return json[Property]
    } catch (error) {
        console.log(error);
    }
}

/**
 * Add data to an Array inside a JSON file.
 *
 * @param {Object} options
 * @param {string} options.Property
 * @param {string} options.ArrayName
 * @param {*} options.Data
 * @param {boolean} options.AutoAlign
 * @param {string} options.JsonFilePath
 */


function pushToPropertyArray({ Property, ArrayName, Data, AutoAlign, JsonFilePath }) {
    if (!Property) throw new Error("Enter a property name.");
    if (!ArrayName) throw new Error("Enter an array name.");
    if (!Data) throw new Error("Enter data to write it to the property.");
    if (!JsonFilePath) throw new Error("Enter JSON file path.");
    try {
        let configFile = fs.readFileSync(JsonFilePath);
        let config = JSON.parse(configFile);

        if (!config[Property]) {
            config[Property] = {};
        }

        if (!config[Property][ArrayName]) {
            config[Property][ArrayName] = [];
        }

        config[Property][ArrayName].push(Data);

        AutoAlign ? fs.writeFileSync(JsonFilePath, JSON.stringify(config, null, 2)) : fs.writeFileSync(JsonFilePath, JSON.stringify(config));
        if (LogChanges) return console.log(`Added a new data to the array ( ${ArrayName} ) in property ( ${Property} ) inside ${JsonFilePath}`);
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {Object} options
 * @param {string} options.Property
 * @param {string} options.ArrayName
 * @param {string} options.Data 
 * @param {boolean} options.AutoAlign
 * @param {string} options.JsonFilePath
 */

function removeFromPropertyArray({ Property, ArrayName, Data, AutoAlign, JsonFilePath }) {
    if (!Property) throw new Error("Enter a property name.");
    if (!ArrayName) throw new Error("Enter an array name.");
    if (!Data) throw new Error("Enter data to write it to the property.");
    if (!JsonFilePath) throw new Error("Enter JSON file path.");
    try {
        let configFile = fs.readFileSync(JsonFilePath);
        let config = JSON.parse(configFile);
    
        if (!config[Property]) {
          config[Property] = {};
        }
    
        if (!config[Property][ArrayName]) {
          config[Property][ArrayName] = [];
        }
    
        const index = config[Property][ArrayName].indexOf(Data);
        if (index !== -1) {
          config[Property][ArrayName].splice(index, 1);
        }

        AutoAlign ? fs.writeFileSync(JsonFilePath, JSON.stringify(config, null, 2)) : fs.writeFileSync(JsonFilePath, JSON.stringify(config));
        if (LogChanges) return console.log(`Removed data from the array ( ${ArrayName} ) in property ( ${Property} ) inside ${JsonFilePath}`);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    write,
    remove,
    update,
    get,
    pushToPropertyArray,
    removeFromPropertyArray,
    setLog,
}