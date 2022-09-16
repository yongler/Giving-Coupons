import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const payload = req.body;

    if (httpMethod === "GET") {
      const campaigns = await prisma.campaign.findMany();
      res.status(200).json(campaigns);
    } else if (httpMethod === "POST") {
      const campaign = await prisma.campaign.create({
        data: payload,
      });
      res.status(200).json(campaign);
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
