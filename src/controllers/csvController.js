const { Parser } = require('json2csv');
const csvtojson = require("csvtojson")
const controller = {};

const downloadResource = (res, fileName, fields, data) => {
  const json2csv = new Parser(fields);
  const csv = json2csv.parse(data);
  res.header('Content-Type', 'text/csv');
  res.attachment(fileName);
  return res.send(csv);
}

const merge = (array, object) => {
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

const removeDuplicates = (originalArray, prop) => {
   var newArray = [];
   var lookupObject  = {};

   for(var i in originalArray) {
       const mergedObject = merge(originalArray, originalArray[i])
      lookupObject[originalArray[i][prop]] = mergedObject;
   }

   for(i in lookupObject) {
       newArray.push(lookupObject[i]);
   }
    return newArray;
}


controller.get = (req, res) => {
  res.render('csv', {});
};

controller.save = async (req, res) => {
  const { data, name } = req.files.csvFile;
  const csvData = data.toString('utf8');

  const json = await csvtojson().fromString(csvData);
  const uniqueArray = await removeDuplicates(json, "Name");

  const fields = ['Name', 'Phone', 'Address'];
  const opts = { fields };
  return await downloadResource(res, `Result-${name}`, opts, uniqueArray);
};
module.exports = controller;
