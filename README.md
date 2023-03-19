# Flamebase
![npm](https://img.shields.io/npm/v/flamebase?label=Version&style=for-the-badge)
![discord](https://img.shields.io/discord/910211115043135510?label=support&style=for-the-badge)

### Flamebase is a simple NPM package that can edit JSON files easily

# Installation:
```sh
npm i flamebase
```

# Documentation:

### Write to JSON file:
```js
const Flamebase = require("flamebase");

Flamebase.write({
    Property: "new-property",
    Data: "You can put anything here even objects or arrays",
    AutoAlign: true, // Auto arange the file after writing it
    JsonFilePath: "./json-file.json"
});

```

### Remove from JSON file:
```js
const Flamebase = require("flamebase");

Flamebase.remove({
    Property: "new-property", // The property that you want to delete
    AutoAlign: true, // Auto arange the file after writing it
    JsonFilePath: "./json-file.json"
});

```

### Update the JSON file:
```js
const Flamebase = require("flamebase");

Flamebase.update({
    Property: "new-property",
    Data: ["NEW", "DATA", "HERE"],
    AutoAlign: true, // Auto arange the file after writing it
    JsonFilePath: "./json-file.json"
});

```

### Get property value inside the JSON file
```js
console.log(Flamebase.get({
    Property: "new-property",
    JsonFilePath: "./json-file.json"
}))
```

### Add data to array inside a property:
```js
Flamebase.pushToPropertyArray({
    Property: "new-property",
    ArrayName: "Array0",
    Data: "New Array Data", // Data that you want to add to the array
    AutoAlign: true, // Auto arange the file after writing it
    JsonFilePath: "./json-file.json"
})
```

### Remove data from array inside a property:
```js
Flamebase.removeFromPropertyArray({
    Property: "new-property",
    ArrayName: "Array0",
    Data: "New Array Data", // Data that you want to remove from the array
    AutoAlign: true, // Auto arange the file after writing it
    JsonFilePath: "./json-file.json"
})
```

# For support or new idea:
### Discord: Flamend#2247 
