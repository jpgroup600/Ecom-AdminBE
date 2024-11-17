const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Notification schema
const NotificationSchema = new Schema(
  {
    sender: {
      type: String,
    
  
    },
    receiver: {
      type: String,
      

    
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } 
);

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
