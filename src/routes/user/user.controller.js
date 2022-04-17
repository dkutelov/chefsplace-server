const { createProfile } = require("../../models/user/user.model");

async function httpCreateProfile(req, res) {
  const { profile } = req.body;
  const newProfile = await createProfile(profile);
  if (newProfile) {
    return res.status(201).json(newProfile);
  } else {
    return res.status(400).json({ error: "Profile exisits!" });
  }
}

module.exports = {
  httpCreateProfile,
};
