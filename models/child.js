const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const Child = mongoose.model(
  "Childs",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
    },
    sex: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
    },

    dob: {
      type: Date,
      min: "1950-01-01",
      max: "2020-01-01",
      required: true,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
    },
    motherName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
    },
    state: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 50,
        },
      }),
      required: true,
    },
    district: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 50,
        },
      }),
      required: true,
    },
    childImage: {
      type: String,
      required: true,
    },
  })
);

function validateChild(child) {
  const schema = {
    name: Joi.string().min(1).max(50).required(),
    sex: Joi.string().min(1).max(50).required(),
    dob: Joi.date().required(),
    fatherName: Joi.string().min(1).max(50).required(),
    motherName: Joi.string().min(1).max(50).required(),
    stateId: Joi.objectId().required(),
    districtId: Joi.objectId().required(),
  };

  return Joi.validate(child, schema);
}

exports.Child = Child;
exports.validate = validateChild;
