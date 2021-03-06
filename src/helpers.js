const { Parser } = require('json2csv');

exports.downloadResource = (res, fileName, fields, data) => {
    const json2csv = new Parser(fields);
    const csv = json2csv.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);
  }
  
exports.merge = (array, object) => {
    const foundObject = array.find(el => el.Name === object.Name);
      if(foundObject !== undefined){
           if(foundObject.Phone !== object.Phone){
             object.Phone = `${object.Phone}, ${foundObject.Phone}`;
           }
            if(foundObject.Address !== object.Address){
             object.Address = `${object.Address}, ${foundObject.Address}`;
           }
       }
  return object;
  }
  
exports.removeDuplicates = (originalArray, prop) => {
     var newArray = [];
     var lookupObject  = {};
  
     for(var i in originalArray) {
         const mergedObject = this.merge(originalArray, originalArray[i])
        lookupObject[originalArray[i][prop]] = mergedObject;
     }
  
     for(i in lookupObject) {
         newArray.push(lookupObject[i]);
     }
      return newArray;
  }