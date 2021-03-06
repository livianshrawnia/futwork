const csvtojson = require("csvtojson");
const { downloadResource, removeDuplicates } = require("../helpers");
const controller = {};

controller.get = (req, res) => {
  res.render('csv');
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
