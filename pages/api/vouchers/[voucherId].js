export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const voucherId = req.query.voucherId;
    const { status, charityId, amountAdded } = req.body;

    if (httpMethod === "GET") {
      res.status(200).json({
        voucherId: voucherId,
        campaignId: "3920c565-16fd-416b-94dc-d13c56846811",
        amount: 10,
        deadline: "2022-09-23T15:59:59.000Z",
        status: "not redeemed",
        charityId: null,
        amountAdded: null,
      });
    } else if (httpMethod === "PUT") {
      res.status(200).json({
        voucherId: voucherId,
        campaignId: "3920c565-16fd-416b-94dc-d13c56846811",
        amount: 10,
        deadline: "2022-09-23T15:59:59.000Z",
        status: status,
        charityId: charityId,
        amountAdded: amountAdded,
      });
    } else if (httpMethod === "DELETE") {
      res.status(200).json({
        voucherId,
      });
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
