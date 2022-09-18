import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const campaignId = req.query.campaignId;
    const cookies = req.cookies;
    const jwt = cookies.GivingCouponsJWT;

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

      const charitiesChosenByDonor = campaign.charitiesChosenByDonor;
      const charities =
        charitiesChosenByDonor.length != 0
          ? charitiesChosenByDonor
          : await prisma.charity.findMany();
      campaign.charitiesChosenByDonor = charities;

      res.status(200).json(campaign);
    } else if (httpMethod === "DELETE") {
      if (!jwt) {
        res.status(401).json({ message: "Not Authorized" });
      }

      const campaign = await prisma.campaign.delete({
        where: {
          id: campaignId,
        },
        include: {
          vouchers: true,
          charitiesChosenByDonor: true,
        },
      });

      const charitiesChosenByDonor = campaign.charitiesChosenByDonor;
      const charities =
        charitiesChosenByDonor.length != 0
          ? charitiesChosenByDonor
          : await prisma.charity.findMany();
      campaign.charitiesChosenByDonor = charities;

      res.status(200).json(campaign);
    } else {
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
