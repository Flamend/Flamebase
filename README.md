# Flamebase

[![npm](https://img.shields.io/npm/v/flamebase?label=Version&style=for-the-badge)](https://www.npmjs.com/package/flamebase)  

Flamebase is a simple NPM package designed to easily edit JSON files, functioning as a lightweight and straightforward JSON-based database.

## Installation

Install Flamebase using the following command:

```bash
npm i flamebase
```

## Documentation

### Import the Package

```javascript
const Flamebase = require("flamebase");
```

### Database Management

#### Register a Database

```javascript
Flamebase.registerDatabase("database-name-here", "/path/to/jsonfile.json");
```

#### Remove a Database

```javascript
Flamebase.removeDatabase("database-name-here");
```

#### Get All Registered Databases

```javascript
const databases = Flamebase.getDatabases(); // Returns the Databases object
console.log(databases);
```

#### Get Database Stats

```javascript
const stats = Flamebase.getDatabaseStats("database-name-here"); // Returns info like entries, size, createdAt, and modifiedAt
console.log(stats);
```

#### Clear a Database

```javascript
Flamebase.clearDatabase("database-name-here");
```

### Database Operations

#### Write to a Database

```javascript
Flamebase.write({
  Property: "prop1.prop2.prop3",
  Data: "You can put anything here, including objects or arrays",
  AutoAlign: true, // Automatically arrange the file after writing
  Database: "database-name-here",
});
```

#### Remove from a Database

```javascript
Flamebase.remove({
  Property: "prop1.prop2.prop3",
  AutoAlign: true, // Automatically arrange the file after writing
  Database: "database-name-here",
});
```

#### Update a Database

```javascript
Flamebase.update({
  Property: "prop1.prop2.prop3",
  Data: "New data or value of the property",
  AutoAlign: true, // Automatically arrange the file after writing
  Database: "database-name-here",
});
```

### Retrieving Data

#### Get Property Value or Entire Database

```javascript
// Get a specific property value
const getValue = Flamebase.get({
  Property: "prop1.prop2.prop3",
  Database: "database-name-here",
});
console.log(getValue);

// Get the whole database
const getDatabase = Flamebase.get({
  Database: "database-name-here",
});
console.log(getDatabase);
```

### Array Operations

#### Push to an Array

```javascript
Flamebase.pushToArray({
  Property: "prop1.prop2.prop3",
  Value: "New value", // Value to add to the array
  AutoAlign: true, // Automatically arrange the file after writing
  Database: "database-name-here",
});
```

#### Remove from an Array

```javascript
Flamebase.removeFromArray({
  Property: "prop1.prop2.prop3",
  Value: "New value", // Value to remove from the array
  AutoAlign: true, // Automatically arrange the file after writing
  Database: "database-name-here",
});
```

## Support or Suggestions

For support or to share new ideas, connect via Discord:

**Discord:** [@flamend](https://discord.gg/GKdCUT6Twe)
