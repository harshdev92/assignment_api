const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const { stateSchema } = require("./state");

const District = mongoose.model(
  "Districts",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    state: {
      type: stateSchema,
      required: true,
    },
  })
);

function validateDistrict(district) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    stateId: Joi.objectId().required(),
  };

  return Joi.validate(district, schema);
}

exports.District = District;
exports.validate = validateDistrict;
