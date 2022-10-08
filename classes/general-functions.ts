class GeneralFunctions{
    SheetArrayToObject(keys: string[], objectData: any[]): object{
        if (keys.length != objectData.length){
             throw new Error("Amount of keys not equal to amount of key values");       
        }

        var obj = {}; 
        keys.forEach((key,i) => { obj[key] = objectData[i];});
        return obj;
    }
    SheetToObjects(dataRange: any[], columns: number[], keys: string[]): object[] {
        if (keys.length != columns.length){ 
            throw new Error("Amount of keys not equal to amount of key values");
        }
       
        var results: object[] = []; 
        dataRange.forEach((row,i) => {
            var objectData: any[] =[];     
            columns.forEach(column => { objectData.push(row[column-1]); }); 
            const resultObject = this.SheetArrayToObject(keys,objectData) ;
            results.push(resultObject);
        });
        return results;

    }     

}