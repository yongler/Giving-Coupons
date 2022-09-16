import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const campaignId = req.query.campaignId;
    const { vouchers } = req.body;

    if (httpMethod === "GET") {
      const campaign = await prisma.campaign.findFirst({
        where: {
          id: campaignId,
        },
      });
      res.status(200).json(campaign);
    } else if (httpMethod === "PATCH") {
      const campaign = await prisma.campaign.update({
        where: {
          id: campaignId,
        },
        data: {
          vouchers,
        },
      });
      res.status(200).json(campaign);
    } else if (httpMethod === "DELETE") {
      const campaign = await prisma.campaign.delete({
        where: {
          id: campaignId,
        },
      });
      res.status(200).json(campaign);
    } else {
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
