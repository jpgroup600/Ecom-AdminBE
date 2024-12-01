const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Notification schema
const NotificationSchema = new Schema(
  {
     productId: {
      type: String,
    },
    receiver: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } 
);

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
