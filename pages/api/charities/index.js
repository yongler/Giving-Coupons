import prisma from "../../../lib/prisma";
import { firebaseAdmin } from "../../../firebase/firebaseAdmin";

export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const payload = req.body;

    if (httpMethod === "GET") {
      const charities = await prisma.charity.findMany();
      res.status(200).json(charities);
    } else if (httpMethod === "POST") {
      try {
        const jwt = req.headers.authorization.replace("Bearer ", "").trim();
        await firebaseAdmin.auth().verifyIdToken(jwt);
      } catch (err) {
        res.status(401).json({ message: "Not Authorized" });
      }

      const charity = await prisma.charity.create({
        data: payload,
      });
      res.status(200).json(charity);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
}
