const auth = require("../middleware/auth");
const { District, validate } = require("../models/district");
const { State } = require("../models/state");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const district = await District.find().sort("name");
  res.send(district);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const state = await State.findById(req.body.stateId);
  if (!state) return res.status(400).send("add state.");

  const district = new District({
    name: req.body.name,
    state: {
      _id: state._id,
      name: state.name,
    },
  });
  await district.save();

  res.send(district);
});

module.exports = router;
