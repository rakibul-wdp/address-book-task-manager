const mongoose = require("mongoose");
const { dateValidator, dateConverter } = require('../utils/utils');

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required']
  },
  status: {
    type: String,
    enum: {
      values: ['PENDING', 'COMPLETED'],
      message: '{VALUE} is not a valid status. Should be PENDING or COMPLETED'
    },
    default: 'PENDING'
  },
  dueDate: {
    type: String,
    required: [true, 'Due date required'],
    validate: {
      validator: function (v) {
        return dateValidator(v) && (dateConverter(v) > Date.now());
      },
      message: props => `${props.value} is not a valid date, must be in dd-mm-yyyy format and later than today!`
    },
  }
});

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;