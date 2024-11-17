const mongoose = require('mongoose');

const TabsModelSchema = new mongoose.Schema({
  stringsArray: {
    type: [String],
    required: true
  }
});

const TabsModel = mongoose.model('Tabs', TabsModelSchema);

module.exports = TabsModel;
