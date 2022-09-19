export default async function handler (req, res) {
  try {
    const httpMethod = req.method
    const charityId = req.query.charityId
    const payload = req.body

    if (httpMethod === 'GET') {
      const charity = await prisma.charity.findFirst({
        where: {
          id: charityId
        }
      })
      res.status(200).json(charity)
    } else if (httpMethod === 'PATCH') {
      const charity = await prisma.charity.update({
        where: {
          id: charityId
        },
        data: payload
      })
      res.status(200).json(charity)
    } else if (httpMethod === 'DELETE') {
      const charity = await prisma.charity.delete({
        where: {
          id: charityId
        }
      })
      res.status(200).json(charity)
    } else {
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
      res.status(405).end(`Method ${httpMethod} Not Allowed`)
    }
  } catch (err) {
    res.status(500).json(err.toString())
  }
}
