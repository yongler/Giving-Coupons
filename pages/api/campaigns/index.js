export default async function handler(req, res) {
  try {
    const httpMethod = req.method;

    if (httpMethod === "GET") {
      res.status(200).json([
        {
          id: "3920c565-16fd-416b-94dc-d13c56846811",
          donor: "Ally Tan",
          totalAmount: 100,
          vouchers: [
            {
              voucherId: "7d1818c8-af20-4ace-963b-ed796ae23bdd",
              campaignId: "3920c565-16fd-416b-94dc-d13c56846811",
              amount: 10,
              deadline: "2023-03-01T15:59:59.000Z",
              status: "not redeemed",
              charityId: null,
              amountAdded: null,
            },
          ],
          startDate: "2022-12-31T16:00:00.000Z",
          endDate: "2023-03-01T15:59:59.000Z",
        },
        {
          id: "c65cab84-d6fe-44e3-ba86-751f3001886b",
          donor: "Bobby Ng",
          totalAmount: 1000,
          vouchers: [
            {
              voucherId: "ce618c55-42b9-443d-9b4d-c71f74cd2bc3",
              campaignId: "c65cab84-d6fe-44e3-ba86-751f3001886b",
              amount: 10,
              deadline: "2023-01-07T15:59:59.000Z",
              status: "not redeemed",
              charitId: null,
              amountAdded: null,
            },
            {
              voucherId: "71077b46-4701-4025-9b41-a9e700f72c0d",
              campaignId: "c65cab84-d6fe-44e3-ba86-751f3001886b",
              amount: 10,
              deadline: "2023-01-07T15:59:59.000Z",
              status: "redeemed",
              charityId: "4f103c5c-ae1c-49aa-919e-ecf81307e833",
              amountAdded: 1,
            },
          ],
          startDate: "2022-12-24T16:00:00.000Z",
          endDate: "2023-01-07T15:59:59.000Z",
        },
      ]);
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
