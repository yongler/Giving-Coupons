import prisma from "../../../lib/prisma";
import { unredeemed } from "../../../util/constants/voucherStatus";

export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const { campaignId, amount, deadline } = req.body;
    const jwt = jwtExtractor(req);

    if (httpMethod === "GET") {
      if (!jwt) {
        res.status(401).json({ message: "Not Authorized" });
      }

      const vouchers = await prisma.voucher.findMany();
      res.status(200).json(vouchers);
    } else if (httpMethod === "POST") {
      const voucher = await prisma.voucher.create({
        data: {
          campaign: {
            connect: {
              id: campaignId,
            },
          },
          amount: amount,
          deadline: deadline,
          status: unredeemed,
        },
      });
      res.status(201).json(voucher);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
