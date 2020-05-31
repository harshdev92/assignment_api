const auth = require("../middleware/auth");
const { Child, validate } = require("../models/child");
const { District } = require("../models/district");
const { State } = require("../models/state");
const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// limits: {
//   fieldSize: 1024 * 1024 * 5,
// },

const upload = multer({
  storage: storage,

  fileFilter: fileFilter,
});

const router = express.Router();

router.get("/", async (req, res) => {
  const child = await Child.find().sort("name");
  res.send(child);
});

router.post("/", upload.single("childImage"), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const state = await State.findById(req.body.stateId);
  if (!state) return res.status(400).send("add state id.");

  const district = await District.findById(req.body.districtId);
  if (!district) return res.status(400).send("add district id.");

  const child = new Child({
    name: req.body.name,
    sex: req.body.sex,
    dob: req.body.dob,
    fatherName: req.body.fatherName,
    motherName: req.body.motherName,
    state: {
      _id: state._id,
      name: state.name,
    },
    district: {
      _id: district._id,
      name: district.name,
    },
    childImage: req.file.path,
  });
  await child.save();

  res.send(child);
});

router.get("/:id", async (req, res) => {
  const child = await Child.findById(req.params.id);

  if (!child)
    return res.status(404).send("The child with the given ID was not found.");

  res.send(child);
});

module.exports = router;
