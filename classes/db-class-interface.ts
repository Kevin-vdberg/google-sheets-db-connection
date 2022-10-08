interface DataBase {
    DefineObjectKeys(keys: string []): void,
    GetAll():object [],
    GetById(id:string):object,
    GetByProperties(properties: string [],propertiesValues: any []):object[],
    SetNew(newData: any []):void,
    Update(id:string,property:string,propertyValue:any):void,
}