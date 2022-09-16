import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const payload = req.body;

    if (httpMethod === "GET") {
      const charities = await prisma.charity.findMany();
      res.status(200).json(charities);
    } else if (httpMethod === "POST") {
      const charity = await prisma.charity.create({
        data: payload,
      });
      res.status(200).json(charity);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
