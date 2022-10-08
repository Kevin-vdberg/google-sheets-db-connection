//database functions, require a database object
function DefineObjectKeys(dbObject:DataBase,keys:string[])
{return dbObject.DefineObjectKeys(keys);}

function GetAll(dbObject:DataBase):object [] 
{return dbObject.GetAll(); }

function GetById(dbObject:DataBase, id:string):object 
{return dbObject.GetById(id); }

function GetByProperties(dbObject:DataBase,properties: string [],propertiesValues: any []):object[]
{ return dbObject.GetByProperties(properties,propertiesValues); }

function SetNew(dbObject:DataBase,newData: any []):void
 { return dbObject.SetNew(newData); }

function Update(dbObject:DataBase,id:string,property:string,propertyValue:any):void
{ return dbObject.Update(id,property,propertyValue) ;}

//general functions
function GenerateDatabaseObject(type: string, options: GoogleSheetOptions | any){
    switch (type) {
        case "GoogleSheets": 
            const id = options.id;
            const sheetName= options.sheetName; 
            return new GoogleSheet(id, sheetName);
        default:
            throw new Error ("Type not implemented");
    }

}
function SheetArrayToObject(keys: string[], objectData: any[]): object{
    if (keys.length != objectData.length){
      throw new Error("Amount of keys not equal to amount of key values");       
    }
      var obj = {}; 
      keys.forEach((key,i) => {
        obj[key] = objectData[i];
      });
    return obj;
}
function SheetToObjects(dataRange: any[], columns: number[], keys: string[]): object[] {
    if (keys.length != columns.length){ throw new Error("Amount of keys not equal to amount of key values");}
    
    var results: object[] =[]; 
    dataRange.forEach((row,i) => {
        var objectData: any[] =[] ;     
        columns.forEach(column => { objectData.push(row[column -1]); }); 
        const resultObject = this.SheetArrayToObject(keys,objectData) ;
        results.push(resultObject);
    });
    return results;

}     
 