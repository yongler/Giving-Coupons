export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const { voucherId, campaignId, amount, deadline } = req.body;

    if (httpMethod === "POST") {
      res.status(201).json({
        voucherId: voucherId,
        campaignId: campaignId,
        amount: amount,
        deadline: deadline,
        status: "not redeemed",
        charityId: null,
        amountAdded: null,
      });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
