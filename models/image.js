const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model('Image', imageSchema);
