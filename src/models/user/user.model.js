const User = require("./user.mongo");
const Address = require("./address.mongo");
const Products = require("../products/products.mongo");

function transformProfile(p) {
  return {
    uid: p.uid,
    email: p.email,
    orders: p.orders,
    deliveryAddress: p.deliveryAddress,
    invoiceAddress: p.invoiceAddress,
    id: p._id,
    created: p.created,
  };
}

async function createProfile(profile) {
  const { uid, email } = profile;
  const isExisting = await User.findOne({ uid });

  if (!isExisting) {
    try {
      const createdProfile = await User.create({ uid, email });
      return transformProfile(createdProfile);
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}

async function findProfileByUid(uid) {
  try {
    const profile = await User.findOne({ uid }, { __v: 0 }).populate(
      "deliveryAddress"
    );
    return { profile };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function findProfileById(id) {
  try {
    const profile = await User.findById(id, { __v: 0 }).populate(
      "deliveryAddress"
    );
    return { profile };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function removeDefaultAddress(userId, addressType) {
  const user = await User.findOne({ _id: userId });

  if (addressType === "delivery") {
    const deliveryAddresses = user.deliveryAddress;

    deliveryAddresses.forEach(async (addressId) => {
      const address = await Address.updateOne(
        { _id: addressId },
        { isDefault: false }
      );
    });
  }
}

async function createDeliveryAddress(userId, address) {
  const newAddress = await Address.create({ ...address });

  if (address.isDefault) {
    await removeDefaultAddress(userId, "delivery");
  }

  await User.updateOne(
    { _id: userId },
    { $push: { deliveryAddress: newAddress._id } }
  );
  return newAddress;
}

async function createCartItem(userId, cartItem) {
  //Validate user
  let user = null;
  try {
    user = await User.findById(userId);

    if (!user) {
      return {
        error: true,
        message: "Няма такъв потребител!",
      };
    }
  } catch (e) {
    throw new Error({
      message: "Няма такъв потребител!",
    });
  }

  //Validate productId
  const { productId } = cartItem;
  const product = Products.findById(productId);

  if (!product) {
    return {
      error: true,
      message: "Няма такъв продукт!",
    };
  }

  //Already in cart
  const existingCartItem = user.cart.find((x) => x.productId === productId);

  if (existingCartItem) {
    const { quantity } = cartItem;
    existingCartItem.quantity += quantity;
    user.save();
    return {
      success: true,
      message: "Продуктът е вече в количката! Количеството е актуализирано!",
    };
  } else {
    const res = await User.updateOne(
      { _id: userId },
      { $push: { cart: cartItem } }
    );
    return {
      success: true,
      message: "Продуктът е добавен към количката!",
    };
  }
}

module.exports = {
  createProfile,
  findProfileById,
  findProfileByUid,
  createDeliveryAddress,
  createCartItem,
};
