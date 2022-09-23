const { PrismaClient } = require("@prisma/client")
const crypto = require("crypto")

const prisma = new PrismaClient()

async function main() {
  await prisma.charity.upsert({
    where: { id: "make-a-wish" },
    update: {},
    create: {
      id: "make-a-wish",
      name: "Make-A-Wish Singapore",
      description:
        "Make-A-Wish Singapore is a children's charity organisation that grants the wishes of children with critical illnesses. Making even a small donation can go a long way to inspire hope and deliver strength to these children.",
      image: "Make-A-Wish-SG.png",
      link: "https://www.makeawish.org.sg/",
    },
  })

  await prisma.charity.upsert({
    where: { id: "sos" },
    update: {},
    create: {
      id: "sos",
      name: "Samaritans of Singapore",
      description:
        "Founded in 1969, Samaritans of Singapore (SOS) is the leading suicide prevention agency in Singapore. Secular and not for profit, they provide 24-hour confidential emotional support to individuals facing a crisis. Your donation helps SOS match the rising demand for support amongst at-risk individuals across Singapore.",
      image: "sos.png",
      link: "https://www.sos.org.sg/",
    },
  })

  await prisma.charity.upsert({
    where: { id: "twc2" },
    update: {},
    create: {
      id: "twc2",
      name: "Transient Workers Count Too",
      description:
        "Transient Workers Count Too extends help to low-wage migrant workers who have been injured, unpaid, or abused by employers. Doing low-wage work, migrant workers do not have savings to tide them through difficulties. Your donation helps TWC2 extend a lifeline to those in need.",
      image: "twc2.png",
      link: "https://twc2.org.sg/",
    },
  })

  await prisma.charity.upsert({
    where: { id: "beyond" },
    update: {},
    create: {
      id: "beyond",
      name: "Beyond Social Services",
      description:
        "Beyond Social Services is a charity dedicated to helping children and youths from less privileged backgrounds break away from the poverty cycle. Every dollar you donate will better the lives of disadvantaged children through their programmes.",
      image: "beyond.png",
      link: "https://www.beyond.org.sg/",
    },
  })

  await prisma.charity.upsert({
    where: { id: "hwa" },
    update: {},
    create: {
      id: "hwa",
      name: "Handicaps Welfare Association",
      description:
        "For the past 50 years, the Handicaps Welfare Association (HWA) has been providing needed services to people with physical disabilities. Your donation allows HWA to meet the increasing and changing needs of people with disabilities and the rapidly aging population.",
      image: "hwa.jpg",
      link: "https://hwa.org.sg/",
    },
  })

  const email = "giving.coupons.sg+test@gmail.com"
  const password = "password"

  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      saltHashedPassword: crypto
        .createHash("sha256")
        .update(email + password)
        .digest("hex"),
    },
  })

  await prisma.campaign.upsert({
    where: { id: 0 },
    update: {},
    create: {
      id: 0,
      name: "Test Campaign",
      description: "This is a test campaign",
      donor: "Anonymous Donor",
      voucherAmount: 10,
      numVouchers: 1,
      endDate: "2022-10-01T00:00:00.000Z",
      charitiesChosenByDonor: {
        connect: ["make-a-wish", "twc2", "sos", "beyond", "hwa"].map((x) => ({
          id: x,
        })),
      },
      vouchers: {
        create: [{ id: "test", status: 0 }],
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
