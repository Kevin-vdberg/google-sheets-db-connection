class GoogleSheet implements DataBase  {
    private spreadsheet_: GoogleAppsScript.Spreadsheet.Sheet; 
    private dataArray_: any []; 
    public objectKeys: string []; 

    constructor(id: string,sheetName: string){
        try { 
            this.spreadsheet_ = SpreadsheetApp.openById(id).getSheetByName(sheetName); 
            this.dataArray_ = this.spreadsheet_.getDataRange().getValues();
            this.objectKeys = this.dataArray_[0];
            this.dataArray_.shift();
        } 
        catch (e) {throw "Error initializing sheet-db, error: " + e}
    }
    
    DefineObjectKeys(keys: string[]): void {
        const numColumns: number = keys.length ;
        var dataRange = this.spreadsheet_.getRange(1,2,1,numColumns);
        dataRange.setValues([keys]);
        return ;
    }
    GetAll(): object[] {    
        var results = [];
        this.dataArray_.forEach(row => {
            const sheetObj = SheetArrayToObject(this.objectKeys,row) ;
            results.push(sheetObj);    
        });
        return results; 
    }
    GetById(id: string): object {
        var result: object; 
        this.dataArray_.forEach(row => {
            if(id === row[0]) {result = SheetArrayToObject(this.objectKeys,row)}       
        });
        return result;
    }
    GetByProperties(keys: string[], keyValues: any[]): object[] {
        if (keys.length != keyValues.length){
            throw new Error ("amount of properties not equal to amount of property values");
          }
    //initialize variables
        var searchObject = {};
        var dataList = [];
        var searchList = [];
        var results = [];

        keys.forEach((key,i) => { searchObject[key] = keyValues[i]; }); //create searchObject
        dataList= this.GetAll(); //get data and convert to list of search objects

        dataList.forEach((obj,i) => {
          var searchedObj = {}; 
          keys.forEach((key,i) => { searchedObj[key] = obj[key] ; });
          searchList.push(searchedObj) ;
        });

    //find index of matching objects and push object to list
        searchList.forEach((searchedObject,i) => {
            if (JSON.stringify(searchedObject) === JSON.stringify(searchObject)){
                results.push(dataList[i]);
            }    
        });
      return results;
    }

    //TODO: update SetNew to update based on key position instead
    SetNew(newData: any[]): void {
        const lastRow = this.spreadsheet_.getLastRow(); 
        const lengthOfObject = this.objectKeys.length;
    
        const newDataRange = this.spreadsheet_.getRange(lastRow + 1, 1,newData.length,lengthOfObject);
        var newDataArray = [] ;
        
        newData.forEach(object => {
            //add a uid when writing
            const uid = this.GenerateUid() ;
            object.uid = uid; 
            var newArray = this.ObjectToSheetArray(object);
            newDataArray.push(newArray); 
        });
        this.objectKeys.forEach(key=>{
            const col = this.FindPropertyColumn(key); 

        })
        newDataRange.setValues(newDataArray); 
            return ;
    }
    Update(id: string, property: string, propertyValue: any): void {
        const columnIndex = this.FindPropertyColumn(property);
    //find value row
        var rowIndex: number;
        this.dataArray_.forEach((row,i) => {
            const idData = row[0];
            if (idData == id) rowIndex = i+1; 
        });
    
        const range = this.spreadsheet_.getRange(rowIndex+1,columnIndex+1).setValue(propertyValue);
        return ;
    }

//Private functions
    private FindPropertyColumn(property: string,keys=this.objectKeys){
        var columnIndex: number;
        keys.forEach((key, i) => {
            if (key === property) { columnIndex = i; } 
        });
        return columnIndex;
    }

    private ObjectToSheetArray(obj: object, includeHeader = false){
        const keys = Object.keys(obj);
        var result = [];
        if (includeHeader) {result.push(keys); }

        this.objectKeys.forEach(key => {
            var objectArray;; 
            if(obj[key]) {
                objectArray = obj[key];}
            else {
                objectArray = "";
            }
            result.push(objectArray);  
             
        });
        return result;
    }    

    private GenerateUid():string {
        const id = Date.now().toString(36) + Math.random().toString(36).substring(0,2)
        return id; 
    }

    private ObjectToSortedSheetArray(array: object[]):any [] {
        const arrayKeys = Object.keys(array); 
        var result = []; 

        array.forEach(object => {
            this.objectKeys.forEach(key => {
                if(array[key]) {result.push(array[key])}
                else {result.push("")};
            });
        });
        return

    }

}