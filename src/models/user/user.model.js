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

async function removeDefaultAddress(user, addressType) {
  if (addressType === "delivery") {
    const deliveryAddresses = user.deliveryAddress;

    deliveryAddresses.forEach(async (addressId) => {
      const address = await Address.updateOne(
        { _id: addressId },
        { isDefault: false }
      );
    });
  } else if (addressType === "invoice") {
    const invoiceAddresses = user.invoiceAddress;

    invoiceAddresses.forEach(async (addressId) => {
      const address = await Address.updateOne(
        { _id: addressId },
        { isDefault: false }
      );
    });
  }
}

async function createDeliveryAddress(userId, address) {
  const user = await User.findOne({ _id: userId });

  if (address.isDefault) {
    await removeDefaultAddress(user, "delivery");
  } else if (!user.deliveryAddress || user.deliveryAddress.length === 0) {
    address.isDefault = true;
  }

  const newAddress = await Address.create({ ...address });

  await User.updateOne(
    { _id: userId },
    { $push: { deliveryAddress: newAddress._id } }
  );
  return newAddress;
}

async function updateDeliveryAddress(userId, addressId, address) {
  //Handle isDefault
  const result = await Address.updateOne({ _id: addressId }, { ...address });
  console.log({ result });
  return result;
}

async function deleteDeliveryAddress(userId, addressId) {
  // Delete address
  const deletedAddress = await Address.findOneAndDelete({ _id: addressId });

  // Update user
  await User.updateOne(
    { _id: userId },
    { $pull: { deliveryAddress: deletedAddress._id } }
  );

  // Handle default
  if (deletedAddress && deletedAddress.isDefault) {
    const user = await User.findById(userId);
    console.log("user", user);
    if (user.deliveryAddress && user.deliveryAddress.length > 0) {
      console.log("😊");
      const newDefaultId = user.deliveryAddress[0];
      await Address.updateOne(
        {
          _id: newDefaultId,
        },
        {
          isDefault: true,
        }
      );
    }
  }

  return deletedAddress;
}

async function createInvoiceAddress(userId, address) {
  const user = await User.findOne({ _id: userId });

  if (address.isDefault) {
    await removeDefaultAddress(user, "invoice");
  } else if (!user.invoiceAddress || user.invoiceAddress.length === 0) {
    address.isDefault = true;
  }

  const newAddress = await Address.create({ ...address });

  await User.updateOne(
    { _id: userId },
    { $push: { invoiceAddress: newAddress._id } }
  );
  return newAddress;
}

// User Cart

async function getUserById(userId) {
  try {
    return await User.findById(userId);
  } catch (e) {
    throw new Error("Системна Грешка!");
  }
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
  const existingCartItem = user.cart.find(
    (x) => x.productId.toString() === productId
  );

  // Existing item - overrides with the new quantity
  if (existingCartItem) {
    const { quantity } = cartItem;
    const res = await User.updateOne(
      { _id: userId, "cart.productId": productId },
      { $set: { "cart.$.quantity": +quantity } }
    );

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

async function updateCartItem(userId, cartItem) {}

async function removeCartItem(userId, cartItemId) {
  console.log(userId, cartItemId);
  try {
    const profile = await User.updateOne(
      { _id: userId },
      {
        $pull: {
          cart: {
            productId: cartItemId,
          },
        },
      }
    );
    return profile;
  } catch (error) {
    throw new Error({
      message: "Грешка при запис данни!",
    });
  }
}

module.exports = {
  getUserById,
  createProfile,
  findProfileById,
  findProfileByUid,
  createDeliveryAddress,
  updateDeliveryAddress,
  deleteDeliveryAddress,
  createCartItem,
  updateCartItem,
  removeCartItem,
  createInvoiceAddress,
};
