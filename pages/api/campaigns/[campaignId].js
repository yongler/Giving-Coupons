import prisma from "../../../lib/prisma";
import { firebaseAdmin } from "../../../firebase/firebaseAdmin";

export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const campaignId = parseInt(req.query.campaignId);

    if (httpMethod === "GET") {
      const campaign = await prisma.campaign.findFirst({
        where: {
          id: campaignId,
        },
        include: {
          vouchers: true,
          charitiesChosenByDonor: true,
        },
      });

      res.status(200).json(campaign);
    } else if (httpMethod === "DELETE") {
      const campaign = await prisma.campaign.delete({
        where: {
          id: campaignId,
        },
        include: {
          vouchers: true,
          charitiesChosenByDonor: true,
        },
      });

      res.status(200).json(campaign);
    } else {
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
}
