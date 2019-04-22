const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Player = new Schema({
  name: {
    type: String
  },
  position: {
    type: String
  },
  MA: {
    type: Number
  }
},{
    collection: 'player'
});

module.exports = mongoose.model('Player', Player);