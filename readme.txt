
This library contains general functions to prepare your sheet data to be written to a database, like converting tables to objects
  -GenerateDatabaseObject(type, options)
    Generates a database object to be used with the database functions. You also need to provide some options, depending on your type of database
    - Googlesheets: needs {id: sheet-id, sheetName: name-of-the-sheet}

This library includes functions to write your sheet data to a database, the first argument always needs to be the database object of the database you want to write to
    - DefineObjectKeys(keys: string []): void
      Allow you to define the object you are using in your database by defining the keys of the object. 
    - GetAll():object []
      Returns a list of all objects in the database
    - GetById(id:string):object
      Returns the object with a certain id
    - GetByProperties(properties: string [],propertiesValues: any []):object[],
      Returns a list of objects that match your search values. Search values always need to be an array, even if you are searching for one value
    - SetNew(newData: any []):void,
      Writes a new entry to the database
    - Update(id:string,property:string,propertyValue:any):void,
      Updates a certain property for the object with the matching id