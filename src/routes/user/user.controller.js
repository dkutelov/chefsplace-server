const {
  createProfile,
  findProfileById,
} = require("../../models/user/user.model");

async function httpGetProfile(req, res) {
  const id = req.query.id;
  const profile = await findProfileById(id);
  if (profile) {
    return res.status(201).json(profile);
  } else {
    return res.status(400).json({ error: "Няма такъв профил!" });
  }
}
async function httpCreateProfile(req, res) {
  const { profile } = req.body;
  const newProfile = await createProfile(profile);
  if (newProfile) {
    return res.status(201).json(newProfile);
  } else {
    return res.status(400).json({ error: "Грешка. Опитай отново!" });
  }
}

module.exports = {
  httpCreateProfile,
  httpGetProfile,
};
