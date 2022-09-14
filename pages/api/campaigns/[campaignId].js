export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const campaignId = req.query.campaignId;

    if (httpMethod === "GET") {
      res.status(200).json({
        id: campaignId,
        donor: "Ally Tan",
        totalAmount: 100,
        vouchers: [
          {
            voucherId: "7d1818c8-af20-4ace-963b-ed796ae23bdd",
            campaignId: campaignId,
            amount: 10,
            deadline: "2023-03-01T15:59:59.000Z",
            status: "not redeemed",
            charityId: null,
            amountAdded: null,
          },
        ],
        startDate: "2022-12-31T16:00:00.000Z",
        endDate: "2023-03-01T15:59:59.000Z",
      });
    } else if (httpMethod === "DELETE") {
      res.status(200).json({
        campaignId,
      });
    } else {
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
