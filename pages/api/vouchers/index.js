import prisma from "../../../lib/prisma"
import { firebaseAdmin } from "../../../firebase/firebaseAdmin"

export default async function handler(req, res) {
  try {
    const jwt = req.headers.authorization.replace("Bearer ", "").trim()
    await firebaseAdmin.auth().verifyIdToken(jwt)
  } catch (err) {
    res.status(401).json({ message: "Not Authorized" })
  }

  try {
    const httpMethod = req.method

    if (httpMethod === "GET") {
      const vouchers = await prisma.voucher.findMany({
        include: {
          campaign: {
            include: {
              charitiesChosenByDonor: true,
            },
          },
        },
      })
      res.status(200).json(vouchers)
    } else {
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${httpMethod} Not Allowed`)
    }
  } catch (err) {
    res.status(500).json(err.toString())
  }
}
