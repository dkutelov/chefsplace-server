const stripeClient = require("stripe")(process.env.STRIPE_KEY);

async function httpCardPayment(req, res) {
  const { data } = req.body;
  const { token, amount } = data;
  const orderAmount = Math.floor(Number(amount) * 100);

  stripeClient.paymentIntents
    .create({
      amount: orderAmount,
      currency: "BGN",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: {
          token,
        },
      },
      confirm: true,
    })
    .then((paymentIntent) => {
      console.log({ paymentIntent });
      res.status(200).json(paymentIntent);
    })
    .catch((e) => {
      console.log(e);
      res.status(400);
      res.send(e);
    });
}

module.exports = {
  httpCardPayment,
};
