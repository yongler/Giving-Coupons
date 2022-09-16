import prisma from "../../../lib/prisma";
import { unredeemed } from "../../../util/constants/voucherStatus";

export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const { id, campaignId, amount, deadline } = req.body;

    if (httpMethod === "POST") {
      const voucher = await prisma.voucher.create({
        data: {
          id: id,
          campaignId: campaignId,
          amount: amount,
          deadline: deadline,
          status: unredeemed,
          charityId: null,
          amountAdded: null,
        },
      });
      res.status(201).json(voucher);
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
