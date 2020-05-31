const auth = require("../middleware/auth");
const { State, validate } = require("../models/state");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const states = await State.find().sort("name");
  res.send(states);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let state = new State({ name: req.body.name });
  state = await state.save();

  res.send(state);
});

module.exports = router;
