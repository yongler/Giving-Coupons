import prisma from "../../../lib/prisma";
import { redeemed } from "../../../util/constants/voucherStatus";
import { firebaseAdmin } from "../../../firebase/firebaseAdmin";

export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const voucherId = req.query.voucherId;
    const { charityId, amountAdded, message } = req.body;

    if (httpMethod === "GET") {
      const voucher = await prisma.voucher.findFirst({
        where: {
          id: voucherId,
        },
        include: {
          campaign: {
            include: {
              charitiesChosenByDonor: true,
            },
          },
        },
      });
      res.status(200).json(voucher);
    } else {
      try {
        const jwt = req.headers.authorization.replace("Bearer ", "").trim();
        await firebaseAdmin.auth().verifyIdToken(jwt);
      } catch (err) {
        res.status(401).json({ message: "Not Authorized" });
      }

      if (httpMethod === "PATCH") {
        let old = await prisma.voucher.findFirst({
          where: {
            id: voucherId,
          },
          include: {
            campaign: true,
          },
        });
        if (!old) {
          res.status(400).json("Invalid id");
          return;
        } else if (old.status == redeemed) {
          res.status(400).json("Coupon redeemed");
          return;
        } else if (new Date() > old.campaign.endDate) {
          res.status(400).json("Coupon expired");
          return;
        }
        const voucher = await prisma.voucher.update({
          where: {
            id: voucherId,
          },
          data: {
            status: redeemed,
            charity: {
              connect: {
                id: charityId,
              },
            },
            amountAdded,
            message,
            timeSubmitted: new Date(),
          },
        });
        res.status(200).json(voucher);
      } else if (httpMethod === "DELETE") {
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
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
}
