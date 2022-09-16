import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const { donor, totalAmount, startDate, endDate, charitiesChosenByDonor } =
      req.body;

    if (httpMethod === "GET") {
      const campaigns = await prisma.campaign.findMany({
        include: {
          charitiesChosenByDonor: true,
          vouchers: true,
        },
      });

      const allCharities = await prisma.charity.findMany();

      const campaignsWithCharities = campaigns.map((campaign) => {
        const charitiesChosenByDonor = campaign.charitiesChosenByDonor;
        const charities =
          charitiesChosenByDonor.length != 0
            ? charitiesChosenByDonor
            : allCharities;
        delete campaign.charitiesChosenByDonor;
        return { ...campaign, charities };
      });

      res.status(200).json(campaignsWithCharities);
    } else if (httpMethod === "POST") {
      const campaign = await prisma.campaign.create({
        data: {
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
          charitiesChosenByDonor: true,
          vouchers: true,
        },
      });

      const charities =
        charitiesChosenByDonor.length != 0
          ? charitiesChosenByDonor
          : await prisma.charity.findMany();

      res.status(200).json({ ...campaign, charities });
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
