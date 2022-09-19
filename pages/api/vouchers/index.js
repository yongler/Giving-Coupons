import prisma from '../../../lib/prisma'
import { unredeemed } from '../../../util/constants/voucherStatus'

export default async function handler (req, res) {
  try {
    const httpMethod = req.method
    const { campaignId } = req.body

    if (httpMethod === 'GET') {
      const vouchers = await prisma.voucher.findMany()
      res.status(200).json(vouchers)
    } else if (httpMethod === 'POST') {
      const voucher = await prisma.voucher.create({
        data: {
          campaign: {
            connect: {
              id: campaignId
            }
          },
          status: unredeemed
        }
      })
      res.status(201).json(voucher)
    } else {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${httpMethod} Not Allowed`)
    }
  } catch (err) {
    res.status(500).json(err.toString())
  }
}
