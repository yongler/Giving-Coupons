import prisma from "../../../lib/prisma";
import { jwtExtractor } from "../../../util/functions/jwtHelpers";

export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const {
      name,
      description,
      donor,
      totalAmount,
      startDate,
      endDate,
      charitiesChosenByDonor,
    } = req.body;

    if (httpMethod === "GET") {
      const campaigns = await prisma.campaign.findMany({
        include: {
          vouchers: true,
          charitiesChosenByDonor: true,
        },
      });

      const allCharities = await prisma.charity.findMany();

      const campaignsWithCharities = campaigns.map((campaign) => {
        const charitiesChosenByDonor = campaign.charitiesChosenByDonor;
        const charities =
          charitiesChosenByDonor.length != 0
            ? charitiesChosenByDonor
            : allCharities;
        campaign.charitiesChosenByDonor = charities;
        return campaign;
      });

      res.status(200).json(campaignsWithCharities);
    } else if (httpMethod === "POST") {
      const jwt = jwtExtractor(req);
      if (!jwt) {
        res.status(401).json({ message: "Not Authorized" });
      }

      const campaign = await prisma.campaign.create({
        data: {
          name,
          description,
          donor,
          totalAmount,
          startDate,
          endDate,
          charitiesChosenByDonor: {
            connect: charitiesChosenByDonor.map((x) => {
              return {
                id: x.id,
              };
            }),
          },
        },
        include: {
          vouchers: true,
          charitiesChosenByDonor: true,
        },
      });

      const charities =
        charitiesChosenByDonor.length != 0
          ? charitiesChosenByDonor
          : await prisma.charity.findMany();
      campaign.charitiesChosenByDonor = charities;

      res.status(200).json(campaign);
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
