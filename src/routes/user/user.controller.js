const {
  getUserById,
  createProfile,
  findProfileById,
  findProfileByUid,
  createDeliveryAddress,
  createCartItem,
} = require("../../models/user/user.model");

async function httpGetProfile(req, res) {
  const id = req.query.id;
  const uid = req.query.uid;
  let profile;
  if (uid) {
    profile = await findProfileByUid(uid);
  }

  if (id) {
    profile = await findProfileById(id);
  }

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

async function httpCreateDeliveryAddress(req, res) {
  const { address } = req.body;
  const userId = req.params.id;
  const createdAddress = await createDeliveryAddress(userId, address);
  if (createdAddress) {
    return res.status(201).json(createdAddress);
  } else {
    return res.status(400).json({ error: "Грешка. Опитай отново!" });
  }
}

async function httpAddCartItem(req, res) {
  const { cartItem } = req.body;
  const userId = req.params.userId;

  try {
    const createdCartItem = await createCartItem(userId, cartItem);
    if (createdCartItem) {
      return res.status(201).json(createdCartItem);
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function httpUpdateCartItem(req, res) {}
async function httpRemoveCartItem(req, res) {
  console.log("hi");
  const userId = req.params.userId;
  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(500).json({ error: "Няма такъв потребител!" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  httpCreateProfile,
  httpGetProfile,
  httpCreateDeliveryAddress,
  httpAddCartItem,
  httpUpdateCartItem,
  httpRemoveCartItem,
};
