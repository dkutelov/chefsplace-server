const User = require("./user.mongo");

async function createProfile(profile) {
  const { uid, email } = profile;
  const isExisting = await User.findOne({ uid });
  console.log(isExisting);
  if (!isExisting) {
    try {
      const createdProfile = await User.create({ uid, email });
      return createdProfile;
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}

module.exports = {
  createProfile,
};
