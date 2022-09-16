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
        include: {
          vouchers: true,
        },
      });
      if (campaign.charitiesChosenByDonor == null) {
        const charities = await prisma.charity.findMany();
        campaign.charities = charities;
      }
      res.status(200).json(campaign);
    } else if (httpMethod === "DELETE") {
      const campaign = await prisma.campaign.delete({
        where: {
          id: campaignId,
        },
        include: {
          vouchers: true,
        },
      });
      if (campaign.charitiesChosenByDonor == null) {
        const charities = await prisma.charity.findMany();
        campaign.charities = charities;
      }
      res.status(200).json(campaign);
    } else {
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
