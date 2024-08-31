const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    DeviceId: {
      required: true,
      type: String,
    },
    Hours: {
      required: true,
      type: Number,
    },
    StartingTime: {
      required: true,
      type: Date,
    },
    Deadline: {
      required: true,
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const taskSchema = new mongoose.Schema(
  {
    Description: {
      required: true,
      type: String,
    },
    Category: {
      required: true,
      type: String,
    },
    StartingTime: {
      required: true,
      type: Date,
    },
    Deadline: {
      required: true,
      type: Date,
    },
    EstimatedDuration: {
      required: true,
      type: Number,
    },
    ActualDuration: {
      required: true,
      type: Number,
    },
    Status: {
      required: true,
      type: Number,
      default: 0,
    },
    Setting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Setting",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
const Setting = mongoose.model("Setting", settingSchema);

module.exports = {
  Task,
  Setting,
};
