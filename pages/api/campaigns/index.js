import prisma from '../../../lib/prisma'
import { unredeemed } from '../../../util/constants/voucherStatus'

export default async function handler (req, res) {
  try {
    const httpMethod = req.method
    if (httpMethod === 'GET') {
      await handleRead(req, res)
    } else if (httpMethod === 'POST') {
      await handleAdd(req, res)
    } else {
      res.setHeader('Allow', ['POST', 'GET'])
      res.status(405).end(`Method ${httpMethod} Not Allowed`)
    }
  } catch (err) {
    res.status(500).json(err.toString())
  }
}

async function handleRead (req, res) {
  const campaigns = await prisma.campaign.findMany({
    include: {
      vouchers: true,
      charitiesChosenByDonor: true
    }
  })

  res.status(200).json(campaigns)
}

async function handleAdd (req, res) {
  const {
    name,
    description,
    donor,
    voucherAmount,
    numVouchers,
    endDate,
    charitiesChosenByDonor
  } = req.body
  const campaign = await prisma.campaign.create({
    data: {
      name,
      description,
      donor,
      voucherAmount,
      numVouchers,
      endDate,
      charitiesChosenByDonor: {
        connect: charitiesChosenByDonor.map(x => ({ id: x }))
      }
    }
  })
  const voucherIds = genVoucherIds(campaign.id, numVouchers)
  const vouchers = voucherIds.map(id => ({
    id: id,
    campaignId: campaign.id,
    status: unredeemed
  }))
  await prisma.voucher.createMany({ data: vouchers })
  res.status(200).json(campaign)
}

// Generates voucher codes
function genVoucherIds (campaignId, numVouchers) {
  const voucherIds = []
  for (let i = 0; i < numVouchers; i++) {
    // Generate random suffix to prevent guessing
    const suffix = Math.random()
      .toString(36)
      .slice(2, 4)
      .toUpperCase()
    voucherIds.push(campaignId + '-' + String(i).padStart(2, '0') + suffix)
  }
  return voucherIds
}
