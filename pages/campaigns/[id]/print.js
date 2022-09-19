import Coupon from '../../../components/Coupon'

export default function CouponView ({ coupons, endDate, voucherAmount }) {
  return coupons.map(c => {
    c.campaign = { endDate, voucherAmount }
    return <Coupon coupon={c} key={c.id} />
  })
}

export async function getServerSideProps (context) {
  const id = context.params.id
  const res = await fetch(process.env.URL + `/api/campaigns/` + id)
  const data = await res.json()
  return {
    props: {
      coupons: data.vouchers,
      endDate: data.endDate,
      voucherAmount: data.voucherAmount
    }
  }
}
