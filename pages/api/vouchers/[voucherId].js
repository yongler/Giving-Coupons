import prisma from "../../../lib/prisma";
import { jwtExtractor } from "../../../util/functions/jwtHelpers";

export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const voucherId = req.query.voucherId;
    const { status, charityId, amountAdded } = req.body;
    const jwt = jwtExtractor(req);

    if (httpMethod === "GET") {
      const voucher = await prisma.voucher.findFirst({
        where: {
          id: voucherId,
        },
      });
      res.status(200).json(voucher);
    } else if (httpMethod === "PATCH") {
      const voucher = await prisma.voucher.update({
        where: {
          id: voucherId,
        },
        data: {
          status,
          charity: {
            connect: {
              id: charityId,
            },
          },
          amountAdded,
        },
      });
      res.status(200).json(voucher);
    } else if (httpMethod === "DELETE") {
      if (!jwt) {
        res.status(401).json({ message: "Not Authorized" });
      }

      const voucher = await prisma.voucher.delete({
        where: {
          id: voucherId,
        },
      });
      res.status(200).json(voucher);
    } else {
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
