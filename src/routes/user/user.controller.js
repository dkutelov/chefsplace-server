const {
  getUserById,
  createProfile,
  findProfileById,
  findProfileByUid,
  createDeliveryAddress,
  deleteDeliveryAddress,
  createCartItem,
  removeCartItem,
  createInvoiceAddress,
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

async function httpDeleteDeliveryAddress(req, res) {
  const userId = req.params.id;
  const addressId = req.params.addressId;

  const result = await deleteDeliveryAddress(userId, addressId);

  if (result) {
    return res.status(200).json({ message: "Адресът е изтрит успешно!" });
  } else {
    return res
      .status(400)
      .json({ error: "Грешка при изтриването на адреса. Опитай отново!" });
  }
}

async function httpCreateInvoiceAddress(req, res) {
  const { address } = req.body;
  const userId = req.params.id;
  const createdAddress = await createInvoiceAddress(userId, address);
  if (createdAddress) {
    return res.status(201).json(createdAddress);
  } else {
    return res.status(400).json({ error: "Грешка. Опитай отново!" });
  }
}

//Get user
async function getUser(res, userId) {
  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(500).json({ error: "Няма такъв потребител!" });
    }

    return user;
  } catch (error) {
    return res.status(500).json({ error });
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

// Remove cart item
async function httpRemoveCartItem(req, res) {
  const { userId, cartItemId } = req.params;

  const user = await getUser(res, userId);
  await removeCartItem(user._id, cartItemId);
  return res.status(200).json({ success: true });
}

module.exports = {
  httpCreateProfile,
  httpGetProfile,
  httpCreateDeliveryAddress,
  httpDeleteDeliveryAddress,
  httpAddCartItem,
  httpUpdateCartItem,
  httpRemoveCartItem,
  httpCreateInvoiceAddress,
};
