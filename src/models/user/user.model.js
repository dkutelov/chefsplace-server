const User = require("./user.mongo");
const Address = require("./address.mongo");

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

async function findProfileById(id) {
  try {
    const profile = await User.findOne({ uid: id }, { __v: 0 }).populate(
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
  console.log({ ...address });

  if (address.isDefault) {
    await removeDefaultAddress(userId, "delivery");
  }

  await User.updateOne(
    { _id: userId },
    { $push: { deliveryAddress: newAddress._id } }
  );
  return newAddress;
}

module.exports = {
  createProfile,
  findProfileById,
  createDeliveryAddress,
};
